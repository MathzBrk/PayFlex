import {StatsService} from "../services/stats-service";
import {Request, Response} from "express";


export class StatsController {

    private statsService: StatsService;

    constructor() {
        this.statsService = new StatsService();
    }

    public async getTransactionsStats(req: Request, res: Response) {
        console.log("Request received to get transactions stats");
        try{
            const seconds = req.query.seconds ? parseInt(req.query.seconds as string, 10) : 60;
            const stats = await this.statsService.calculateTransactionsStatistics(seconds);
            res.status(200).json(stats);
        } catch (error: any){
            return res.status(400).json({ error: error.message("Error getting transactions stats") });
        }
    }

}