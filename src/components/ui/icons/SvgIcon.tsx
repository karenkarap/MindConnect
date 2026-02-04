interface SvgIconProps {
  name: string;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const SvgIcon = ({ name, width = '24', height = '24', className, style }: SvgIconProps) => {
  return (
    <svg width={width} height={height} className={className} style={style} fill="currentColor">
      <use href={`#${name}`} />
    </svg>
  );
};

export default SvgIcon;
