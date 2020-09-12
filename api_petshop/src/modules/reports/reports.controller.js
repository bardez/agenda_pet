import { sequelize } from '../../models'
import {
    resultSuccess,
    resultError,
    resultEmpty
} from '../../utils/response';
const fields = [
    'name'
]
const auctionReports = async (req, res) =>{

    const result = await sequelize.query(`
        SELECT
            * 
        FROM
            V_AUCTION_HISTORY
        WHERE
            auction_id = :auctionId
    `,{
        replacements:{
            auctionId: req.params.auctionId
        },
        type: sequelize.QueryTypes.SELECT
    });
    

    if(result.length > 0){
        resultSuccess('auction history', res)(result);
    }else{
        resultEmpty(res);
    }
}

export default{
    auctionReports,
}