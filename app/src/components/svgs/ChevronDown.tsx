interface ChevronDownProps {
  className?: string;
}

const ChevronDown: React.FC<ChevronDownProps> = ({ className }) => (
  <svg viewBox="0 0 17 17" fill="none" className={className ?? ""}>
    <path
      d="M4.66117 7.11806L8.08974 10.5466L11.5183 7.11806"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
  </svg>
);

export default ChevronDown;
