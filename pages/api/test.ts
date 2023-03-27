// import { getServerSession } from "next-auth/next"
// import { authOptions } from "./auth/[...nextauth]"
import type { NextApiRequest, NextApiResponse } from 'next'

// export default async function listMovies(req: NextApiRequest,
//     res: NextApiResponse<any>) {
//   const session = await getServerSession(req, res, authOptions)

//   if (session) {
//     res.send({
//       movies: [
//         { title: "Alien vs Predator", id: 1 },
//         { title: "Reservoir Dogs", id: 2 },
//       ],
//     })
//   } else {
//     res.send({
//       error: "You must sign in to view movies.",
//     })
//   }
// }