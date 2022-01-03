import {sendErc20} from "../../models/ethereum.js";
const sendToken = (req,res) =>{
    const _to = req.body.to;
    const _from = req.body.from;
    const amount = req.body.amount;
    try {
        //db에서 private key 불러옴
        //unlock account
        //send
        return res.send({message:"success"});
    } catch (error) {
        console.log(error);
        return res.status(502).send({error});
    } 
}

const serverToken = async (req,res) =>{
    /**
    1.받을 주소 client 한테서 받음
    2.개인키를 사용해 트랜잭션에 서명을 하고 ERC20 컨트랙트의 transfer() 함수를 호출하는 트랜잭션을 보냅니다.
    컨트랙트의 transfer() 함수를 사용해 서버 계정에 있는 토큰 1개를 사용자의 주소로 전송합니다.
    POST /ethFaucet과 동일한 방식으로 트랜잭션에 서명을 하고 보냅니다.
    컨트랙트에 있는 함수를 실행하기 위해서는 트랜잭션에 data 값을 추가해야 합니다.
    참고자료: How can I transfer tokens of my ERC20 automatically from the server?
    컨트랙트의 balanceOf() 함수를 사용하면 특정 주소에 있는 토큰의 갯수를 확인할 수 있습니다.
    3.트랜잭션의 결과에 따라 응답합니다.
    API 문서의 형식에 맞춰 응답합니다.
     */
    const _to = req.body.to;
    const amount = 1;
    //db에서 주소 가져옴
    try {
        await sendErc20("0xb4F1715497e16E18EC178eBADe8894C016b35a8d",amount);//추후 db안의 address로 교체
        res.send({message:"ok"});
    } catch (error) {
        res.send({error});
    }

}

export {sendToken,serverToken}