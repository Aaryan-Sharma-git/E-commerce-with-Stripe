interface Props {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const AuthInput = ({ label, type, value, onChange }: Props) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
    </div>
  );
};

export default AuthInput;
