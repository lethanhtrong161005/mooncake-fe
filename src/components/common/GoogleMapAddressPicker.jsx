import { useMemo, useRef, useState } from 'react';
import { AutoComplete, Button, Input, Modal, Space, message } from 'antd';
import {
  CheckCircleFilled,
  EnvironmentFilled,
  EnvironmentOutlined,
  PushpinFilled,
  SearchOutlined,
} from '@ant-design/icons';

// Top Vietnamese Corporate Hubs & Industrial Zones
const POPULAR_B2B_HUBS = [
  {
    name: 'Tòa nhà Landmark 81',
    address: '720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh, TP. Hồ Chí Minh',
    region: 'TP.HCM',
  },
  {
    name: 'Tòa nhà Bitexco Financial Tower',
    address: '02 Hải Triều, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    region: 'TP.HCM',
  },
  {
    name: 'Saigon Centre Tower (Takashimaya)',
    address: '65 Lê Lợi, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh',
    region: 'TP.HCM',
  },
  {
    name: 'Tòa nhà Keangnam Landmark 72',
    address: 'Phạm Hùng, Phường Mễ Trì, Quận Nam Từ Liêm, Hà Nội',
    region: 'Hà Nội',
  },
  {
    name: 'Lotte Center Hà Nội',
    address: '54 Liễu Giai, Phường Cống Vị, Quận Ba Đình, Hà Nội',
    region: 'Hà Nội',
  },
  {
    name: 'Khu Công Nghệ Cao TP.HCM (SHTP)',
    address: 'Đường D1, Phường Tân Phú, TP. Thủ Đức, TP. Hồ Chí Minh',
    region: 'TP.HCM',
  },
  {
    name: 'Khu Công Nghiệp VSIP 1 Bình Dương',
    address: 'Số 8 Đại lộ Hữu Nghị, KCN Việt Nam - Singapore, TP. Thuận An, Bình Dương',
    region: 'Bình Dương',
  },
];

export default function GoogleMapAddressPicker({
  id,
  value = '',
  onChange,
  placeholder = 'Nhập số nhà, tên đường, tòa nhà hoặc chọn từ Google Map...',
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSearchText, setModalSearchText] = useState(value || '');
  const [mapQuery, setMapQuery] = useState(value || 'Thành phố Hồ Chí Minh, Việt Nam');
  const [options, setOptions] = useState([]);
  const searchTimeoutRef = useRef(null);
  const currentAddress = value || '';

  // Fetch online geocoding suggestions from OpenStreetMap Nominatim / Photon (Vietnam scope)
  const fetchAddressSuggestions = (query) => {
    if (!query || query.trim().length < 2) {
      // Return predefined top corporate hubs
      setOptions(
        POPULAR_B2B_HUBS.map((hub) => ({
          value: hub.address,
          label: (
            <div className="py-1 flex items-start gap-2">
              <EnvironmentFilled className="text-amber-600 mt-0.5" />
              <div>
                <span className="font-semibold text-xs text-stone-900 block">{hub.name}</span>
                <span className="text-[11px] text-stone-500 line-clamp-1">{hub.address}</span>
              </div>
            </div>
          ),
        }))
      );
      return;
    }

    // Filter local corporate presets first
    const localMatches = POPULAR_B2B_HUBS.filter(
      (h) =>
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        h.address.toLowerCase().includes(query.toLowerCase())
    ).map((hub) => ({
      value: hub.address,
      label: (
        <div className="py-1 flex items-start gap-2">
          <PushpinFilled className="text-amber-600 mt-0.5" />
          <div>
            <span className="font-semibold text-xs text-stone-900 block">{hub.name}</span>
            <span className="text-[11px] text-stone-500 line-clamp-1">{hub.address}</span>
          </div>
        </div>
      ),
    }));

    // Free geocoding query to Photon (OSM-based, high performance, no rate-limit blockers)
    fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5&lang=default`)
      .then((res) => res.json())
      .then((data) => {
        const geoItems = (data?.features || [])
          .map((item) => {
            const props = item.properties || {};
            const parts = [
              props.name,
              props.housenumber,
              props.street,
              props.district,
              props.city || props.county,
              props.state,
              props.country,
            ].filter(Boolean);
            const fullAddress = parts.join(', ');
            return {
              value: fullAddress,
              label: (
                <div className="py-1 flex items-start gap-2">
                  <EnvironmentOutlined className="text-[#8c1524] mt-0.5" />
                  <div>
                    <span className="font-semibold text-xs text-stone-900 block">
                      {props.name || parts[0]}
                    </span>
                    <span className="text-[11px] text-stone-500 line-clamp-1">{fullAddress}</span>
                  </div>
                </div>
              ),
            };
          })
          .filter((item) => item.value);

        // Deduplicate and combine
        const combined = [...localMatches, ...geoItems];
        setOptions(combined.slice(0, 7));
      })
      .catch(() => {
        setOptions(localMatches);
      });
  };

  const handleSearchChange = (text) => {
    onChange?.(text);

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      fetchAddressSuggestions(text);
    }, 280);
  };

  const handleSelect = (selectedAddress) => {
    setMapQuery(selectedAddress);
    onChange?.(selectedAddress);
  };

  const handleOpenMap = () => {
    const target = currentAddress || 'Tòa nhà Landmark 81, 720A Điện Biên Phủ, Bình Thạnh, TP.HCM';
    setModalSearchText(target);
    setMapQuery(target);
    setModalOpen(true);
  };

  const handleModalSearchConfirm = () => {
    if (modalSearchText.trim()) {
      setMapQuery(modalSearchText.trim());
    }
  };

  const handleConfirmLocation = () => {
    const finalAddress = modalSearchText.trim() || mapQuery;
    onChange?.(finalAddress);
    setModalOpen(false);
    message.success('Đã lưu vị trí giao hàng từ Google Map.');
  };

  // Google Maps Embed URL (Standard interactive iframe)
  const googleMapEmbedUrl = useMemo(() => {
    const query = encodeURIComponent(mapQuery || 'Hồ Chí Minh, Việt Nam');
    return `https://maps.google.com/maps?q=${query}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
  }, [mapQuery]);

  return (
    <div className="w-full">
      {/* 1. Address Input with AutoComplete and Google Map Trigger */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
        <AutoComplete
          value={currentAddress}
          options={options}
          onSearch={handleSearchChange}
          onSelect={handleSelect}
          onFocus={() => {
            if (!currentAddress) fetchAddressSuggestions('');
          }}
          className="w-full sm:flex-1"
        >
          <Input
            id={id}
            size="large"
            placeholder={placeholder}
            prefix={<EnvironmentOutlined className="text-stone-400 mr-1" />}
            style={{ borderRadius: 10 }}
            allowClear
          />
        </AutoComplete>

        <Button
          type="default"
          size="large"
          icon={<EnvironmentFilled style={{ color: '#ea4335' }} />}
          onClick={handleOpenMap}
          className="w-full sm:w-auto sm:min-w-[154px] justify-center"
          style={{
            borderRadius: 10,
            borderColor: '#ea4335',
            color: '#b91c1c',
            fontWeight: 600,
            background: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
          }}
        >
          Mở Google Map
        </Button>
      </div>

      {/* 2. Map Pinned Badge Indicator if address is chosen */}
      {currentAddress && (
        <div className="mt-1.5 flex items-center justify-between text-[11px] text-stone-500 bg-stone-50 px-2.5 py-1 rounded-lg border border-stone-200/80">
          <div className="flex items-center gap-1 truncate mr-2">
            <CheckCircleFilled className="text-emerald-600 shrink-0" />
            <span className="text-stone-700 font-medium truncate">
              Định vị: {currentAddress}
            </span>
          </div>
          <button
            type="button"
            onClick={handleOpenMap}
            className="text-amber-800 hover:text-amber-900 font-semibold cursor-pointer shrink-0 bg-transparent border-0 p-0"
          >
            Xem bản đồ →
          </button>
        </div>
      )}

      {/* 3. Interactive Google Map Picker Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <EnvironmentFilled style={{ color: '#ea4335', fontSize: 18 }} />
            <span className="font-['Playfair_Display',serif] font-bold text-base text-stone-900">
              Định Vị Điểm Giao Hàng B2B Trên Google Map
            </span>
          </div>
        }
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={780}
        centered
        footer={
          <div className="flex items-center justify-between pt-2 border-t border-stone-100">
            <div className="text-left text-xs text-stone-500 hidden sm:block">
              <span>* Tọa độ sẽ được đồng bộ trực tiếp cho đội xe lạnh chuyên dụng PoD.</span>
            </div>
            <Space>
              <Button onClick={() => setModalOpen(false)} style={{ borderRadius: 8 }}>
                Hủy
              </Button>
              <Button
                type="primary"
                onClick={handleConfirmLocation}
                style={{
                  background: '#8c1524',
                  borderColor: '#8c1524',
                  borderRadius: 8,
                  fontWeight: 600,
                }}
              >
                Xác Nhận Địa Chỉ Này
              </Button>
            </Space>
          </div>
        }
      >
        <div className="flex flex-col gap-3 py-1">
          {/* Search Bar inside Modal */}
          <div className="flex items-center gap-2">
            <Input
              size="large"
              value={modalSearchText}
              onChange={(e) => setModalSearchText(e.target.value)}
              onPressEnter={handleModalSearchConfirm}
              placeholder="Nhập tên tòa nhà, khu công nghiệp hoặc địa chỉ cụ thể..."
              prefix={<SearchOutlined className="text-stone-400 mr-1" />}
              allowClear
              style={{ borderRadius: 10 }}
            />
            <Button
              type="primary"
              size="large"
              onClick={handleModalSearchConfirm}
              style={{ background: '#d48806', borderColor: '#d48806', borderRadius: 10 }}
            >
              Tìm Kiếm
            </Button>
          </div>

          {/* Quick Select Preset Corporate Hubs */}
          <div>
            <span className="text-[11px] font-semibold text-stone-500 block mb-1.5">
              Gợi ý điểm giao nhận doanh nghiệp tiêu biểu:
            </span>
            <div className="flex flex-wrap items-center gap-1.5 max-h-24 overflow-y-auto no-scrollbar">
              {POPULAR_B2B_HUBS.map((hub) => (
                <button
                  key={hub.name}
                  type="button"
                  onClick={() => {
                    setModalSearchText(hub.address);
                    setMapQuery(hub.address);
                  }}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer text-left ${
                    mapQuery === hub.address
                      ? 'border-[#8c1524] bg-red-50 text-[#8c1524] font-semibold'
                      : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700'
                  }`}
                >
                  <span className="font-semibold">{hub.name}</span>
                  <span className="text-[10px] text-stone-400 ml-1">({hub.region})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Google Maps Interactive Embed Frame */}
          <div className="relative w-full h-[360px] sm:h-[400px] rounded-xl overflow-hidden border border-stone-200 shadow-inner bg-stone-100">
            <iframe
              title="Google Map Delivery Pin"
              src={googleMapEmbedUrl}
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Target Address Overlay Card */}
            <div className="absolute top-3 left-3 right-3 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-stone-200 shadow-md flex items-start gap-2.5">
              <EnvironmentFilled className="text-[#ea4335] text-lg mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-bold text-stone-900 block truncate">
                  Điểm giao đã định vị trên Google Map
                </span>
                <span className="text-[11px] text-stone-600 block line-clamp-2 mt-0.5">
                  {mapQuery}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

