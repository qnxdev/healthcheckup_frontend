// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { REST_HOST } from "../../lib/keys";

export default async (req, res) => {
  if (req.query && req.query.symptoms) {
    try {
      const result = await fetch(`${REST_HOST}?symptoms=${req.query.symptoms}`);
      res.status(200).send({ disease: await result.text() });
    } catch (error) {
      console.log(error);
      res.status(404).send({ disease: "None found" });
    }
  } else {
    res.status(404).send({ disease: "None found" });
  }
};
