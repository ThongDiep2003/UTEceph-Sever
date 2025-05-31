export default function toISODateString(dateObject) {
  let result = "";
  if (dateObject && typeof dateObject.getMonth === "function") {
    let month = "" + (dateObject.getMonth() + 1);
    let day = "" + dateObject.getDate();
    let year = dateObject.toISOString().substring(0, 4);

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    result = `${year}-${month}-${day}`;
  }
  return result;
}

export const generatePassword = () => {
  const length = 10;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  return password;
};

export const FILE_CHANGE = {
  INFORMATION: "Information patient",
  MEDICAL_RECORD: "Medical Record",
  TREATMENT_HISTORY: "Treatment history",
  IMAGE_LIBRARY: "Image Library",
  LATERALCEPH: "LateralCeph",
  CALENDAR: "Calendar",
};
