import 'notistack';
declare module 'notistack' {
  interface VariantOverrides {
    kigoError: {
      title?: string;
      actionText?: string;
      actionUrl?: string;
      onClose?: () => void;
      onActionClick?: () => void;
      message?: string;
    };
    kigoInfo: {
      title?: string;
      actionText?: string;
      actionUrl?: string;
      onClose?: () => void;
      onActionClick?: () => void;
      message?: string;
    };
  }
}
