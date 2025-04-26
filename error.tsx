interface ErrorMessageProps {
  title: string;
  message: string;
  onDismiss: () => void;
}

export default function ErrorMessage({ title, message, onDismiss }: ErrorMessageProps) {
  return (
    <div className="fixed bottom-4 right-4 bg-destructive text-white px-4 py-3 rounded-lg shadow-lg flex items-center z-50">
      <span className="material-icons mr-2">error_outline</span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm">{message}</p>
      </div>
      <button 
        className="ml-4 p-1 rounded-full hover:bg-white/20"
        onClick={onDismiss}
      >
        <span className="material-icons">close</span>
      </button>
    </div>
  );
}
