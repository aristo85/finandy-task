const path = require("path").resolve("./");
const fs = require("fs");
import * as yup from "yup";

const schema = yup.object().shape({
  price: yup.number().required().positive().integer(),
  quantity: yup.number().required().positive().integer(),
  sum: yup.number().required().positive().integer(),
});

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        fs.readFile(`${path}/temp.json`, (err, rawData) => {
          if (err) throw err;
          res.status(200).json(rawData);
        });
      } catch (e) {
        console.log(e);
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const isValid = await schema.isValid({
          ...req.body,
        });
        if (isValid) {
          const data = JSON.stringify(req.body);
          fs.writeFile(`${path}/temp.json`, data, (err) => {
            if (err) throw err;
            console.log("Successfully Written to File.");
            res.status(201).json({ success: true, data: req.body });
          });
        }
        // otherwise if not valid add the error to the error list
        await schema.validate({
          ...req.body,
        });
      } catch (e) {
        console.log(e);
        e.message
          ? res.status(400).json({ success: false, message: e.message })
          : res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
