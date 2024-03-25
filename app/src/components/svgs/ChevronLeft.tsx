interface ChevronLeftProps {
  className?: string;
}

const ChevronLeft: React.FC<ChevronLeftProps> = ({ className }) => (
  <svg fill="currentColor" viewBox="0 0 20 20" className={className ?? ""}>
    <path d="M7.05 9.293L6.343 10 12 15.657l1.414-1.414L9.172 10l4.242-4.243L12 4.343z"></path>
  </svg>
);

export default ChevronLeft;
