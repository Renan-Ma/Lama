import { Request, Response } from "express"
import { ShowBusiness } from "../business/ShowBusiness"
import { ShowInputDTO } from "../model/Show"

export class ShowController {

  constructor(
    private showBusiness: ShowBusiness
) { }

  createShow = async (req: Request, res: Response) => {
    try {

      const token = req.headers.authorization!
      const {band_id, week_day, start_time, end_time} = req.body

      const show: ShowInputDTO = {
        
        band_id, 
        week_day,
        start_time,
        end_time
      }

      const newShow = await this.showBusiness.createShow(token, show)

      res.status(201).send({ message: "Show created successfully", newShow })
      
    } catch (error:any) {
      res.status(error.statusCode || 500).send({
        message: error.message
    })
    }
  }
}