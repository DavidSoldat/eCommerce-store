export const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: 350,
  width: ["75%", "75%", "70%", "50%"],
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export const totalReviews = 6;
export const initialReviewsToShow = 4;

export const editModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
    width: {
    sm: 350,
    md: 450,
    lg: 550,
    xl: 650,
  },
  bgcolor: "background.paper",
  border: "1px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

export const imageModalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "800px",
  height: "auto",
  maxHeight: "800px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  outline: "none",
  background: "transparent",

  "@media (max-width: 768px)": {
    maxHeight: "70vh",
    width: "95vw",
  },
};
