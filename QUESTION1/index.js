const express = require('express');
const dns = require('node:dns');

const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    next();
}
);
//ip address getting post request
app.post('/getmeip', (req, res) => {
    dns.lookup(req.body.websiteName, (err, address) => {
        if (err) {
            return res.status(404).send({
                message: 'WebsiteName doest not exist'
            });
        }
        return res.status(200).send({
            websiteName: websiteName,
            ipAddress: address
        });
    }
    );
});

app.listen(7000, () => {
    console.log('Server is running on port 7000');
});