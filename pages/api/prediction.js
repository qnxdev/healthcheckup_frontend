// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  if(req.query && req.query.symptoms){
  console.log(req.query.symptoms.split(","));
  }
  res.status(200).send({disease:'Sinusitis'})
}
