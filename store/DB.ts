import { DataInputs } from "../redux/finandyInputs/types";

export const getFinData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`);
  const notes = await res.json();
  return notes;
};

export const sendFinData = async (data: DataInputs) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": "291",
      Accept: "*/*",
    },
    body: JSON.stringify(data),
  });
  const response = await res.json();
  if (response.success) {
    return { success: true, message: "ok" };
  } else {
    return response.message
      ? { success: false, message: response.message }
      : { success: false, message: "something went wrong" };
  }
};
