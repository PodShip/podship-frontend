// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
    const nots = await testOptFunctionality(req.query.account);

    res.status(200).json(nots);
}
