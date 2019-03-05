export const getStyles = (isDragging, backgroundColor, borderColor, styles = {}) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  opacity: isDragging ? 0 : 1,
  minWidth: 136,
  minHeight: 40,
  borderRadius: 5,
  border: `1px solid ${borderColor}`,
  backgroundColor,
  paddingRight: 40,
  cursor: "pointer",
  paddingLeft: 40,
  ...styles
});
