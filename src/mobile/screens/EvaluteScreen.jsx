import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { colors } from '../theme/colors';

export default function EvaluteScreen({ navigation }) {
  const [approvedItems, setApprovedItems] = useState({
    item1: true,
    item2: true,
    item3: true,
    item4: true,
  });

  const [selectedTooling, setSelectedTooling] = useState('approve');
  const [note, setNote] = useState(
    'Chất lượng 04 bánh mẫu và hộp sơn mài rất xuất sắc. Xưởng lưu ý giữ đúng độ mềm vỏ mỏng và độ ngọt thanh như mẫu thử số 1 và số 3 khi nướng mẻ lớn. Vị số 2 điều chỉnh giảm nhẹ 5% độ ngọt mỡ như đã thống nhất.'
  );

  const toggleItem = (key) => {
    setApprovedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleApprove = () => {
    Alert.alert(
      'Xác Nhận Nghiệm Thu',
      'Bạn có chắc chắn muốn phê duyệt kết quả mẫu thử và tiến hành ký hợp đồng điện tử?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng Ý',
          onPress: () => {
            Alert.alert('Thành công', 'Hồ sơ đã được phê duyệt! Chuyển sang bước Ký Hợp Đồng Điện Tử.');
            navigation?.navigate?.('ElectricContract');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.surface} />
      
      {/* Top App Bar */}
      <View style={styles.appBar}>
        <View>
          <Text style={styles.appBarBrand}>NGUYỆT PHỐ</Text>
          <Text style={styles.appBarSubtitle}>ARTISANAL MOONCAKE</Text>
        </View>
        <View style={styles.vipBadge}>
          <Text style={styles.vipBadgeText}>VIP VINGROUP</Text>
        </View>
      </View>

      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {/* Header Badge & Title */}
        <View style={styles.metaSection}>
          <View style={styles.badgeRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>✓ Đã Giao Thành Công</Text>
            </View>
            <View style={styles.certBadge}>
              <Text style={styles.certBadgeText}>★ OCOP 4 Sao • Hưng Ký</Text>
            </View>
          </View>

          <Text style={styles.pageTitle}>Đánh Giá & Phê Duyệt Mẫu Thử</Text>
          <Text style={styles.pageDescription}>
            Khảo sát ý kiến hội đồng nếm thử nội bộ, chốt độ ngọt nhân bánh & nghiệm thu mẫu dập logo 24K thực tế.
          </Text>
        </View>

        {/* Section 1: Taste Matrix */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>1</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Khảo Sát 4 Vị Bánh Nếm Thử</Text>
              <Text style={styles.cardSubtitle}>Taste Evaluation Matrix</Text>
            </View>
          </View>

          {/* Flavor 1 */}
          <View style={styles.flavorItem}>
            <Text style={styles.flavorName}>01. Bào Ngư Vi Cá Thượng Hạng</Text>
            <Text style={styles.flavorTag}>120g • Vị Hải Vị Thượng Phẩm • ★ 5.0/5</Text>
            <Text style={styles.flavorNote}>
              "Vị đậm đà vừa vặn, bào ngư xắt sợi giòn mềm ngậy nhẹ, thơm mùi rượu thuốc bắc dịu."
            </Text>
            <TouchableOpacity
              style={[styles.checkboxRow, approvedItems.item1 && styles.checkboxRowActive]}
              onPress={() => toggleItem('item1')}
            >
              <Text style={styles.checkboxIcon}>{approvedItems.item1 ? '☑' : '☐'}</Text>
              <Text style={styles.checkboxLabel}>Duyệt đưa vào set sản xuất chính thức</Text>
            </TouchableOpacity>
          </View>

          {/* Flavor 2 */}
          <View style={styles.flavorItem}>
            <Text style={styles.flavorName}>02. Thập Cẩm Xá Xíu Mai Quế Lộ</Text>
            <Text style={styles.flavorTag}>120g • Cổ Truyền Di Sản • ★ 4.8/5</Text>
            <Text style={styles.flavorNote}>
              "Giảm khoảng 5% lượng mỡ đường để người lớn tuổi dùng thanh đạm và dễ tiêu hóa hơn."
            </Text>
            <TouchableOpacity
              style={[styles.checkboxRow, approvedItems.item2 && styles.checkboxRowActive]}
              onPress={() => toggleItem('item2')}
            >
              <Text style={styles.checkboxIcon}>{approvedItems.item2 ? '☑' : '☐'}</Text>
              <Text style={styles.checkboxLabel}>Duyệt kèm lưu ý giảm 5% ngọt mỡ</Text>
            </TouchableOpacity>
          </View>

          {/* Flavor 3 */}
          <View style={styles.flavorItem}>
            <Text style={styles.flavorName}>03. Sen Nhuyễn Hạt Dưa Trứng Muối</Text>
            <Text style={styles.flavorTag}>120g • Thanh Nhã Cố Đô • ★ 5.0/5</Text>
            <Text style={styles.flavorNote}>
              "Hạt sen xay nhuyễn sánh mịn tuyệt hảo, hoàn toàn không bị gắt cổ."
            </Text>
            <TouchableOpacity
              style={[styles.checkboxRow, approvedItems.item3 && styles.checkboxRowActive]}
              onPress={() => toggleItem('item3')}
            >
              <Text style={styles.checkboxIcon}>{approvedItems.item3 ? '☑' : '☐'}</Text>
              <Text style={styles.checkboxLabel}>Duyệt đưa vào set sản xuất chính thức</Text>
            </TouchableOpacity>
          </View>

          {/* Flavor 4 */}
          <View style={styles.flavorItem}>
            <Text style={styles.flavorName}>04. Yến Sào Tuyết Nham Dưỡng Sinh</Text>
            <Text style={styles.flavorTag}>120g • Đường Tự Nhiên Isomalt • ★ 4.9/5</Text>
            <Text style={styles.flavorNote}>
              "Phù hợp chế độ dinh dưỡng lành mạnh, vị tuyết nham thanh mát."
            </Text>
            <TouchableOpacity
              style={[styles.checkboxRow, approvedItems.item4 && styles.checkboxRowActive]}
              onPress={() => toggleItem('item4')}
            >
              <Text style={styles.checkboxIcon}>{approvedItems.item4 ? '☑' : '☐'}</Text>
              <Text style={styles.checkboxLabel}>Duyệt đưa vào set sản xuất chính thức</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2: Physical QC */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>2</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>Nghiệm Thu Mẫu Logo Dập Nhũ Vàng 24K</Text>
              <Text style={styles.cardSubtitle}>Chất lượng vỏ hộp sơn mài bóng gương</Text>
            </View>
          </View>

          <Image
            style={styles.sampleImage}
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBk_cu0qG30XZ85vfdV6FfzYzfPIvjrUEsBFvzau2Iz8AhMVtDrbbrZT_BPjbSMLguTIQf1PizlJp06tvfeGaCBT8QYZoM2sKXJmnQeaEO9LEW28OHC4HmRVe0NMKCvZPIi2txvym1M3egxrfcvylf8dK5oydBOr5t6LfeTfPOruVNhugAOyAFDy71kKN5GhIgKXLnwGZW5g-7Igv6r5chTk-_BYiD2qF4xX8FObIE66yHhpr2_WKKfjA',
            }}
          />

          <View style={styles.qcCheckList}>
            <Text style={styles.qcItemText}>✓ Độ sắc nét đường nét Vector 100% (Khuôn đồng CNC)</Text>
            <Text style={styles.qcItemText}>✓ Chuẩn sắc màu nhũ kim Pantone 871C Đức Kurz</Text>
            <Text style={styles.qcItemText}>✓ Độ dập sâu 0.5mm nổi khối 3D trên sơn mài 5 lớp</Text>
          </View>

          <View style={styles.toolingSelection}>
            <TouchableOpacity
              style={[styles.radioOption, selectedTooling === 'approve' && styles.radioOptionActive]}
              onPress={() => setSelectedTooling('approve')}
            >
              <Text style={styles.radioDot}>{selectedTooling === 'approve' ? '●' : '○'}</Text>
              <Text style={styles.radioText}>Đồng ý mẫu dập này (Sản xuất 200 hộp)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.radioOption, selectedTooling === 'modify' && styles.radioOptionActive]}
              onPress={() => setSelectedTooling('modify')}
            >
              <Text style={styles.radioDot}>{selectedTooling === 'modify' ? '●' : '○'}</Text>
              <Text style={styles.radioText}>Yêu cầu tinh chỉnh (Miễn phí 01 lần)</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 3: Notes for Bakery */}
        <View style={styles.card}>
          <Text style={styles.inputLabel}>Ghi chú chỉ dẫn kỹ thuật gửi Xưởng bánh:</Text>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={4}
            value={note}
            onChangeText={setNote}
          />
        </View>

        {/* Order Summary & CTA */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Hồ Sơ Đơn Hàng #RFQ-2024-8892</Text>
          <Text style={styles.summaryPackage}>200 Hộp VIP Vượng Nguyệt</Text>
          <Text style={styles.summaryPrice}>Tổng giá trị: 120.000.000 VNĐ</Text>
          <Text style={styles.escrowNotice}>
            🔒 Ký quỹ SafeTrade bảo hiểm đền bù 200% nếu phát hiện sai lệch quy cách.
          </Text>

          <TouchableOpacity style={styles.approveButton} onPress={handleApprove}>
            <Text style={styles.approveButtonText}>Xác Nhận Phê Duyệt & Tiếp Tục</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  appBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  appBarBrand: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  appBarSubtitle: {
    fontSize: 10,
    color: colors.secondary,
    letterSpacing: 1.5,
  },
  vipBadge: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vipBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.onSecondaryContainer,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  metaSection: {
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  statusBadge: {
    backgroundColor: colors.surfaceContainerHigh,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 11,
    color: colors.tertiary,
    fontWeight: '600',
  },
  certBadge: {
    backgroundColor: colors.surfaceContainerLow,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  certBadgeText: {
    fontSize: 11,
    color: colors.secondary,
    fontWeight: '600',
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  pageDescription: {
    fontSize: 13,
    color: colors.onSurfaceVariant,
    lineHeight: 18,
  },
  card: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: colors.primaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBadgeText: {
    color: colors.onPrimary,
    fontWeight: '700',
    fontSize: 14,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.onSurface,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.onSurfaceVariant,
  },
  flavorItem: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  flavorName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.onSurface,
    marginBottom: 2,
  },
  flavorTag: {
    fontSize: 11,
    color: colors.secondary,
    fontWeight: '600',
    marginBottom: 6,
  },
  flavorNote: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.onSurfaceVariant,
    marginBottom: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  checkboxRowActive: {
    opacity: 1,
  },
  checkboxIcon: {
    fontSize: 16,
    color: colors.primary,
  },
  checkboxLabel: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  sampleImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 12,
  },
  qcCheckList: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
    gap: 6,
  },
  qcItemText: {
    fontSize: 12,
    color: colors.tertiary,
    fontWeight: '500',
  },
  toolingSelection: {
    gap: 8,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.surfaceContainer,
    gap: 8,
  },
  radioOptionActive: {
    backgroundColor: colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  radioDot: {
    fontSize: 14,
    color: colors.primary,
  },
  radioText: {
    fontSize: 12,
    color: colors.onSurface,
    fontWeight: '500',
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.onSurface,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    borderRadius: 8,
    padding: 10,
    fontSize: 13,
    color: colors.onSurface,
    textAlignVertical: 'top',
  },
  summaryCard: {
    backgroundColor: colors.surfaceContainerLowest,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.outlineVariant,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  summaryTitle: {
    fontSize: 11,
    color: colors.secondary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  summaryPackage: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 4,
  },
  summaryPrice: {
    fontSize: 14,
    color: colors.onSurface,
    fontWeight: '600',
    marginTop: 4,
  },
  escrowNotice: {
    fontSize: 11,
    color: colors.tertiary,
    marginTop: 8,
    marginBottom: 16,
    lineHeight: 16,
  },
  approveButton: {
    backgroundColor: colors.primaryContainer,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  approveButtonText: {
    color: colors.onPrimary,
    fontSize: 14,
    fontWeight: '700',
  },
});
