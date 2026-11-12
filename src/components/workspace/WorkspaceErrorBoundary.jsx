import { Component } from 'react';
import { Button, Result } from 'antd';
import './workspace.css';

/**
 * Keeps the workspace shell (sidebar, header) usable when a page crashes on unexpected data,
 * instead of leaving the whole screen blank.
 */
export default class WorkspaceErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error('[Workspace] Page render failed:', error, info?.componentStack);
  }

  componentDidUpdate(prevProps) {
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  render() {
    if (!this.state.error) return this.props.children;
    return (
      <Result
        className="workspace-error"
        status="warning"
        title="Không thể hiển thị trang này"
        subTitle="Dữ liệu trả về chưa đúng định dạng hoặc trang gặp lỗi. Hãy tải lại; nếu vẫn lỗi, vui lòng báo cho quản trị sàn."
        extra={<Button type="primary" onClick={() => window.location.reload()}>Tải lại trang</Button>}
      />
    );
  }
}
