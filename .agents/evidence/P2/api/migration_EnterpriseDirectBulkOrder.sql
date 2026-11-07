START TRANSACTION;

DROP INDEX IF EXISTS payments_one_open_payment_per_order_key;

ALTER TYPE delivery_status ADD VALUE 'AwaitingCustomerConfirmation';
ALTER TYPE delivery_status ADD VALUE 'Disputed';
ALTER TYPE order_status ADD VALUE 'Expired';
ALTER TYPE order_status ADD VALUE 'AwaitingCustomerDeliveryApproval';
ALTER TYPE order_status ADD VALUE 'CancellationRequested';
ALTER TYPE order_status ADD VALUE 'Disputed';
DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = 'extensions') THEN
        CREATE SCHEMA extensions;
    END IF;
END $EF$;

CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA extensions;
DO $EF$
BEGIN
    IF NOT EXISTS(SELECT 1 FROM pg_namespace WHERE nspname = 'extensions') THEN
        CREATE SCHEMA extensions;
    END IF;
END $EF$;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" SCHEMA extensions;
CREATE EXTENSION IF NOT EXISTS vector;

ALTER TABLE payments ALTER COLUMN refunded_amount TYPE numeric(14,2);

ALTER TABLE payments ALTER COLUMN amount TYPE numeric(14,2);

ALTER TABLE payments ADD part_id uuid;

ALTER TABLE orders ALTER COLUMN total_amount TYPE numeric(14,2);

ALTER TABLE orders ALTER COLUMN tax_amount TYPE numeric(14,2);

ALTER TABLE orders ALTER COLUMN subtotal TYPE numeric(14,2);

ALTER TABLE orders ALTER COLUMN shipping_fee TYPE numeric(14,2);

ALTER TABLE orders ALTER COLUMN packaging_fee TYPE numeric(14,2);

ALTER TABLE orders ALTER COLUMN discount_amount TYPE numeric(14,2);

ALTER TABLE orders ADD confirmed_at timestamp with time zone;

ALTER TABLE orders ADD confirmed_delivery_date date;

ALTER TABLE orders ADD delivery_approval_deadline_at timestamp with time zone;

ALTER TABLE orders ADD delivery_proposal_reason character varying(1000);

ALTER TABLE orders ADD deposit_percent_snapshot numeric(5,2) NOT NULL DEFAULT 0.0;

ALTER TABLE orders ADD deposit_required_snapshot boolean NOT NULL DEFAULT FALSE;

ALTER TABLE orders ADD price_snapshot_version character varying(64);

ALTER TABLE orders ADD proposed_delivery_date date;

ALTER TABLE orders ADD reservation_expires_at timestamp with time zone;

ALTER TABLE orders ADD response_deadline_at timestamp with time zone;

ALTER TABLE orders ADD shipping_zone_code character varying(40);

ALTER TABLE orders ADD shipping_zone_name_snapshot character varying(120);

ALTER TABLE orders ADD tax_included_snapshot boolean NOT NULL DEFAULT TRUE;

ALTER TABLE orders ADD tax_rate_snapshot numeric(5,2) NOT NULL DEFAULT 0.0;

ALTER TABLE orders ADD terms_snapshot_json text;

ALTER TABLE orders ADD version bigint NOT NULL DEFAULT 1;

CREATE TABLE inventory_reservations (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    product_id uuid NOT NULL,
    variant_id uuid NOT NULL,
    shop_id uuid NOT NULL,
    quantity integer NOT NULL,
    status character varying(30) NOT NULL,
    expires_at timestamp with time zone,
    released_at timestamp with time zone,
    release_reason character varying(255),
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_inventory_reservations" PRIMARY KEY (id),
    CONSTRAINT ck_inventory_reservations_qty CHECK (quantity > 0),
    CONSTRAINT "FK_inventory_reservations_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT,
    CONSTRAINT "FK_inventory_reservations_product_variants_variant_id" FOREIGN KEY (variant_id) REFERENCES product_variants (id) ON DELETE RESTRICT
);

CREATE TABLE order_cancellation_requests (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    requested_by_user_id uuid NOT NULL,
    requested_by_role character varying(20) NOT NULL,
    order_status_snapshot character varying(40) NOT NULL,
    reason character varying(1000) NOT NULL,
    status character varying(30) NOT NULL,
    reviewed_by_user_id uuid,
    reviewed_at timestamp with time zone,
    review_notes character varying(1000),
    proposed_refund_amount numeric(14,2) NOT NULL,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_order_cancellation_requests" PRIMARY KEY (id),
    CONSTRAINT "FK_order_cancellation_requests_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT
);

CREATE TABLE order_delivery_disputes (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    delivery_id uuid,
    customer_id uuid NOT NULL,
    shop_id uuid NOT NULL,
    issue_type character varying(50) NOT NULL,
    description character varying(2000) NOT NULL,
    evidence_urls_json text,
    status character varying(30) NOT NULL,
    resolution_notes character varying(1000),
    resolved_by_admin_id uuid,
    resolved_at timestamp with time zone,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_order_delivery_disputes" PRIMARY KEY (id),
    CONSTRAINT "FK_order_delivery_disputes_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT
);

CREATE TABLE order_financial_ledger_entries (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    shop_id uuid NOT NULL,
    customer_id uuid NOT NULL,
    payment_id uuid,
    refund_case_id uuid,
    payout_request_id uuid,
    entry_type character varying(40) NOT NULL,
    amount numeric(14,2) NOT NULL,
    balance_bucket character varying(30) NOT NULL,
    description character varying(500) NOT NULL,
    idempotency_key character varying(160) NOT NULL,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_order_financial_ledger_entries" PRIMARY KEY (id),
    CONSTRAINT "FK_order_financial_ledger_entries_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT
);

CREATE TABLE order_payment_schedule (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    sequence_no integer NOT NULL,
    obligation_type character varying(40) NOT NULL,
    title character varying(200) NOT NULL,
    total_amount numeric(14,2) NOT NULL,
    paid_amount numeric(14,2) NOT NULL,
    status character varying(30) NOT NULL,
    is_required_before_production boolean NOT NULL,
    is_required_before_shipping boolean NOT NULL,
    due_at timestamp with time zone,
    paid_at timestamp with time zone,
    source_reference_id uuid,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_order_payment_schedule" PRIMARY KEY (id),
    CONSTRAINT ck_order_payment_schedule_amounts CHECK (total_amount > 0 AND paid_amount >= 0),
    CONSTRAINT "FK_order_payment_schedule_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT
);

CREATE TABLE order_refund_cases (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    customer_id uuid NOT NULL,
    shop_id uuid NOT NULL,
    cancellation_request_id uuid,
    case_number character varying(50) NOT NULL,
    requested_amount numeric(14,2) NOT NULL,
    approved_amount numeric(14,2) NOT NULL,
    reason character varying(1000) NOT NULL,
    status character varying(30) NOT NULL,
    sandbox_simulated boolean NOT NULL,
    processed_by_admin_id uuid,
    processed_at timestamp with time zone,
    admin_notes character varying(1000),
    refund_reference_code character varying(120),
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_order_refund_cases" PRIMARY KEY (id),
    CONSTRAINT "FK_order_refund_cases_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT
);

CREATE TABLE packaging_fee_change_requests (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    custom_packaging_id uuid NOT NULL,
    revision_id uuid NOT NULL,
    old_packaging_fee numeric(14,2) NOT NULL,
    delta_amount numeric(14,2) NOT NULL,
    new_packaging_fee numeric(14,2) NOT NULL,
    old_order_total numeric(14,2) NOT NULL,
    new_order_total numeric(14,2) NOT NULL,
    order_version_snapshot bigint NOT NULL,
    status character varying(40) NOT NULL,
    customer_notes character varying(1000),
    approved_by_user_id uuid,
    approved_at timestamp with time zone,
    generated_obligation_id uuid,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_packaging_fee_change_requests" PRIMARY KEY (id),
    CONSTRAINT "FK_packaging_fee_change_requests_custom_packaging_revisions_re~" FOREIGN KEY (revision_id) REFERENCES custom_packaging_revisions ("Id") ON DELETE RESTRICT,
    CONSTRAINT "FK_packaging_fee_change_requests_custom_packagings_custom_pack~" FOREIGN KEY (custom_packaging_id) REFERENCES custom_packagings (id) ON DELETE RESTRICT,
    CONSTRAINT "FK_packaging_fee_change_requests_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT
);


CREATE TABLE IF NOT EXISTS packaging_templates (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    shop_id uuid NOT NULL,
    name character varying(255) NOT NULL,
    description text NULL,
    material character varying(150) NULL,
    dimensions character varying(100) NULL,
    capacity integer NOT NULL,
    base_price numeric(12,2) NOT NULL,
    sample_image_url text NULL,
    technique character varying(150) NULL,
    min_order_qty integer NOT NULL,
    is_active boolean NOT NULL DEFAULT TRUE,
    sort_order integer NOT NULL DEFAULT 0,
    is_deleted boolean NOT NULL DEFAULT FALSE,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now(),
    created_by uuid NULL,
    updated_by uuid NULL,
    CONSTRAINT packaging_templates_pkey PRIMARY KEY (id)
);

CREATE TABLE shop_order_policies (
    id uuid NOT NULL,
    shop_id uuid NOT NULL,
    deposit_enabled boolean NOT NULL,
    minimum_order_total_for_deposit numeric(14,2) NOT NULL,
    deposit_percent numeric(5,2) NOT NULL,
    tax_included boolean NOT NULL,
    tax_rate numeric(5,2) NOT NULL,
    allow_self_pickup boolean NOT NULL,
    require_shipping_zone_selection boolean NOT NULL,
    version bigint NOT NULL DEFAULT 1,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_shop_order_policies" PRIMARY KEY (id),
    CONSTRAINT ck_shop_order_policies_deposit_pct CHECK (deposit_percent >= 10 AND deposit_percent <= 50),
    CONSTRAINT ck_shop_order_policies_tax_rate CHECK (tax_rate >= 0 AND tax_rate <= 100),
    CONSTRAINT "FK_shop_order_policies_shops_shop_id" FOREIGN KEY (shop_id) REFERENCES shops (id) ON DELETE RESTRICT
);

CREATE TABLE shop_shipping_rates (
    id uuid NOT NULL,
    shop_id uuid NOT NULL,
    region_code character varying(40) NOT NULL,
    region_name character varying(120) NOT NULL,
    fee_amount numeric(14,2) NOT NULL,
    free_shipping_threshold numeric(14,2),
    estimated_days integer NOT NULL,
    is_supported boolean NOT NULL,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_shop_shipping_rates" PRIMARY KEY (id),
    CONSTRAINT ck_shop_shipping_rates_fee CHECK (fee_amount >= 0 AND estimated_days >= 0),
    CONSTRAINT "FK_shop_shipping_rates_shops_shop_id" FOREIGN KEY (shop_id) REFERENCES shops (id) ON DELETE RESTRICT
);

CREATE TABLE supplier_payout_accounts (
    id uuid NOT NULL,
    supplier_user_id uuid NOT NULL,
    bank_code character varying(30) NOT NULL,
    bank_name character varying(120) NOT NULL,
    account_number character varying(50) NOT NULL,
    account_holder_name character varying(150) NOT NULL,
    branch_name character varying(150),
    is_verified_simulated boolean NOT NULL,
    version bigint NOT NULL DEFAULT 1,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_supplier_payout_accounts" PRIMARY KEY (id),
    CONSTRAINT "FK_supplier_payout_accounts_users_supplier_user_id" FOREIGN KEY (supplier_user_id) REFERENCES users (id) ON DELETE RESTRICT
);

CREATE TABLE payment_parts (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    obligation_id uuid NOT NULL,
    part_index integer NOT NULL,
    total_parts integer NOT NULL,
    amount numeric(14,2) NOT NULL,
    status character varying(30) NOT NULL,
    paid_at timestamp with time zone,
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_payment_parts" PRIMARY KEY (id),
    CONSTRAINT ck_payment_parts_amount CHECK (amount > 0 AND part_index >= 1 AND total_parts >= 1),
    CONSTRAINT "FK_payment_parts_order_payment_schedule_obligation_id" FOREIGN KEY (obligation_id) REFERENCES order_payment_schedule (id) ON DELETE RESTRICT,
    CONSTRAINT "FK_payment_parts_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT
);

CREATE TABLE supplier_payout_requests (
    id uuid NOT NULL,
    order_id uuid NOT NULL,
    shop_id uuid NOT NULL,
    supplier_user_id uuid NOT NULL,
    payout_account_id uuid NOT NULL,
    request_number character varying(50) NOT NULL,
    amount numeric(14,2) NOT NULL,
    status character varying(30) NOT NULL,
    sandbox_simulated boolean NOT NULL,
    bank_snapshot_json text NOT NULL,
    processed_by_admin_id uuid,
    processed_at timestamp with time zone,
    admin_notes character varying(1000),
    payout_reference_code character varying(120),
    is_deleted boolean NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    created_by uuid,
    updated_by uuid,
    CONSTRAINT "PK_supplier_payout_requests" PRIMARY KEY (id),
    CONSTRAINT "FK_supplier_payout_requests_orders_order_id" FOREIGN KEY (order_id) REFERENCES orders (id) ON DELETE RESTRICT,
    CONSTRAINT "FK_supplier_payout_requests_supplier_payout_accounts_payout_ac~" FOREIGN KEY (payout_account_id) REFERENCES supplier_payout_accounts (id) ON DELETE RESTRICT
);

CREATE INDEX idx_pay_part_id ON payments (part_id) WHERE (part_id IS NOT NULL);

CREATE UNIQUE INDEX payments_one_open_payment_per_order_legacy_key ON payments (order_id) WHERE (order_id IS NOT NULL AND part_id IS NULL AND status IN ('Pending', 'Processing', 'Completed') AND is_deleted = false);

CREATE UNIQUE INDEX payments_one_open_payment_per_part_key ON payments (part_id) WHERE (part_id IS NOT NULL AND status IN ('Pending', 'Processing', 'Completed') AND is_deleted = false);

CREATE INDEX idx_orders_customer_cursor ON orders (customer_id, created_at DESC, id DESC) WHERE (is_deleted = false);

CREATE INDEX idx_orders_reservation_expiry ON orders (status, reservation_expires_at) WHERE (is_deleted = false AND reservation_expires_at IS NOT NULL);

CREATE INDEX idx_orders_shop_cursor ON orders (shop_id, created_at DESC, id DESC) WHERE (is_deleted = false);

ALTER TABLE orders ADD CONSTRAINT ck_orders_deposit_percent_range CHECK (deposit_percent_snapshot >= 0 AND deposit_percent_snapshot <= 100);

ALTER TABLE orders ADD CONSTRAINT ck_orders_version_positive CHECK (version > 0);

CREATE INDEX idx_inventory_reservations_status_expires ON inventory_reservations (status, expires_at);

CREATE INDEX "IX_inventory_reservations_variant_id" ON inventory_reservations (variant_id);

CREATE UNIQUE INDEX uq_inventory_reservations_order_variant ON inventory_reservations (order_id, variant_id);

CREATE INDEX idx_order_cancel_requests_order_status ON order_cancellation_requests (order_id, status);

CREATE INDEX idx_order_delivery_disputes_order_status ON order_delivery_disputes (order_id, status);

CREATE INDEX idx_order_financial_ledger_order_created ON order_financial_ledger_entries (order_id, created_at);

CREATE INDEX idx_order_financial_ledger_shop_bucket ON order_financial_ledger_entries (shop_id, balance_bucket);

CREATE UNIQUE INDEX uq_order_financial_ledger_idempotency ON order_financial_ledger_entries (idempotency_key);

CREATE UNIQUE INDEX uq_order_payment_schedule_order_seq ON order_payment_schedule (order_id, sequence_no) WHERE is_deleted = false;

CREATE INDEX idx_order_refund_cases_order_id ON order_refund_cases (order_id);

CREATE UNIQUE INDEX uq_order_refund_cases_number ON order_refund_cases (case_number);

CREATE INDEX idx_pkg_fee_change_order_id ON packaging_fee_change_requests (order_id);

CREATE INDEX "IX_packaging_fee_change_requests_custom_packaging_id" ON packaging_fee_change_requests (custom_packaging_id);

CREATE UNIQUE INDEX uq_pkg_fee_change_revision_id ON packaging_fee_change_requests (revision_id) WHERE is_deleted = false;

CREATE INDEX IF NOT EXISTS idx_packaging_templates_shop_id ON packaging_templates (shop_id);

CREATE INDEX idx_payment_parts_order_id ON payment_parts (order_id);

CREATE UNIQUE INDEX uq_payment_parts_obligation_index ON payment_parts (obligation_id, part_index) WHERE is_deleted = false;

CREATE UNIQUE INDEX uq_shop_order_policies_shop_id ON shop_order_policies (shop_id) WHERE is_deleted = false;

CREATE UNIQUE INDEX uq_shop_shipping_rates_shop_region ON shop_shipping_rates (shop_id, region_code) WHERE is_deleted = false;

CREATE UNIQUE INDEX uq_supplier_payout_accounts_user_id ON supplier_payout_accounts (supplier_user_id) WHERE is_deleted = false;

CREATE INDEX idx_supplier_payout_requests_order_id ON supplier_payout_requests (order_id);

CREATE INDEX "IX_supplier_payout_requests_payout_account_id" ON supplier_payout_requests (payout_account_id);

CREATE UNIQUE INDEX uq_supplier_payout_requests_number ON supplier_payout_requests (request_number);

ALTER TABLE payments ADD CONSTRAINT "FK_payments_payment_parts_part_id" FOREIGN KEY (part_id) REFERENCES payment_parts (id) ON DELETE RESTRICT;


-- Idempotent backfill: 1. Create order_payment_schedule rows for existing active/paid orders without a schedule
INSERT INTO order_payment_schedule (
    id, order_id, sequence_no, obligation_type, title, total_amount, paid_amount,
    status, is_required_before_production, is_required_before_shipping, due_at, paid_at,
    is_deleted, created_at, updated_at, created_by
)
SELECT
    gen_random_uuid(),
    o.id,
    1,
    'FullUpfront',
    'Backfilled full order payment obligation',
    GREATEST(o.total_amount, 1.00),
    CASE WHEN EXISTS (
        SELECT 1 FROM payments p
        WHERE p.order_id = o.id AND p.status = 'Completed'::payment_status AND p.is_deleted = FALSE
    ) THEN GREATEST(o.total_amount, 1.00) ELSE 0 END,
    CASE
        WHEN EXISTS (
            SELECT 1 FROM payments p
            WHERE p.order_id = o.id AND p.status = 'Completed'::payment_status AND p.is_deleted = FALSE
        ) THEN 'Paid'
        WHEN o.status = 'Cancelled'::order_status THEN 'Cancelled'
        ELSE 'Pending'
    END,
    TRUE,
    TRUE,
    o.created_at + INTERVAL '24 hours',
    (SELECT MAX(p.paid_at) FROM payments p WHERE p.order_id = o.id AND p.status = 'Completed'::payment_status AND p.is_deleted = FALSE),
    FALSE,
    o.created_at,
    now(),
    o.customer_id
FROM orders o
WHERE o.is_deleted = FALSE
  AND o.total_amount > 0
  AND (
      o.status IN ('Confirmed'::order_status, 'Processing'::order_status, 'Shipped'::order_status, 'Delivered'::order_status)
      OR EXISTS (SELECT 1 FROM payments p WHERE p.order_id = o.id AND p.is_deleted = FALSE)
  )
  AND NOT EXISTS (
      SELECT 1 FROM order_payment_schedule s WHERE s.order_id = o.id AND s.is_deleted = FALSE
  );

-- Idempotent backfill: 2. Create 1 payment_parts row per backfilled obligation without parts
INSERT INTO payment_parts (
    id, order_id, obligation_id, part_index, total_parts, amount, status, paid_at,
    is_deleted, created_at, updated_at, created_by
)
SELECT
    gen_random_uuid(),
    s.order_id,
    s.id,
    1,
    1,
    s.total_amount,
    s.status,
    s.paid_at,
    FALSE,
    s.created_at,
    now(),
    s.created_by
FROM order_payment_schedule s
WHERE s.is_deleted = FALSE
  AND NOT EXISTS (
      SELECT 1 FROM payment_parts pp WHERE pp.obligation_id = s.id AND pp.is_deleted = FALSE
  );

-- Idempotent backfill: 3. Link existing order-level payments (part_id IS NULL) to part 1
UPDATE payments p
SET part_id = pp.id
FROM payment_parts pp
JOIN order_payment_schedule s ON s.id = pp.obligation_id
WHERE p.order_id = pp.order_id
  AND p.order_id IS NOT NULL
  AND p.part_id IS NULL
  AND p.is_deleted = FALSE
  AND s.sequence_no = 1
  AND pp.part_index = 1;

-- Idempotent backfill: 4. Create Captured/Held ledger entries for existing Completed order payments
INSERT INTO order_financial_ledger_entries (
    id, order_id, shop_id, customer_id, payment_id, entry_type, amount, balance_bucket,
    description, idempotency_key, is_deleted, created_at, updated_at, created_by
)
SELECT
    gen_random_uuid(),
    o.id,
    o.shop_id,
    o.customer_id,
    p.id,
    'Captured',
    p.amount,
    'Held',
    'Backfilled captured order payment into Held balance.',
    'payment-captured:' || p.id::text,
    FALSE,
    COALESCE(p.paid_at, p.created_at),
    now(),
    p.customer_id
FROM payments p
JOIN orders o ON o.id = p.order_id
WHERE p.order_id IS NOT NULL
  AND p.status = 'Completed'::payment_status
  AND p.is_deleted = FALSE
  AND o.is_deleted = FALSE
  AND NOT EXISTS (
      SELECT 1 FROM order_financial_ledger_entries l
      WHERE l.idempotency_key = ('payment-captured:' || p.id::text)
  );

-- Idempotent backfill: 5. Create inventory_reservations for existing active orders
INSERT INTO inventory_reservations (
    id, order_id, product_id, variant_id, shop_id, quantity, status,
    expires_at, is_deleted, created_at, updated_at, created_by
)
SELECT
    gen_random_uuid(),
    o.id,
    oi.product_id,
    oi.variant_id,
    o.shop_id,
    SUM(oi.quantity)::integer,
    CASE WHEN o.status = 'Pending'::order_status THEN 'Active' ELSE 'Committed' END,
    CASE WHEN o.status = 'Pending'::order_status THEN o.created_at + INTERVAL '24 hours' ELSE NULL END,
    FALSE,
    o.created_at,
    now(),
    o.customer_id
FROM orders o
JOIN order_items oi ON oi.order_id = o.id
WHERE o.is_deleted = FALSE
  AND oi.is_deleted = FALSE
  AND o.status IN ('Pending'::order_status, 'Confirmed'::order_status, 'Processing'::order_status, 'Shipped'::order_status, 'Delivered'::order_status)
  AND NOT EXISTS (
      SELECT 1 FROM inventory_reservations ir WHERE ir.order_id = o.id AND ir.variant_id = oi.variant_id
  )
GROUP BY o.id, oi.product_id, oi.variant_id, o.shop_id, o.status, o.created_at, o.customer_id;


INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES ('20261104152702_EnterpriseDirectBulkOrder', '8.0.11');

COMMIT;

