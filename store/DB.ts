
export const getFinData = async () => {
    const res = await fetch(`http://localhost:3000/api`)
    const notes = await res.json();
    return notes;
};
