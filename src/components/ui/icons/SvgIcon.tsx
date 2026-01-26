interface SvgIconProps {
  name: string;
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const SvgIcon = ({ name, size = '24', className, style }: SvgIconProps) => {
  return (
    <svg width={size} height={size} className={className} style={style} fill="currentColor">
      <use href={`#${name}`} />
    </svg>
  );
};

export default SvgIcon;
