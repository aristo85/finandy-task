
export const getFinData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api`)
    const notes = await res.json();
    return notes;
};
