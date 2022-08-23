const fs = require('fs');
const express = require('express');
const cors = require('cors');
let data = fs.readFileSync('products.json');
let sabData = JSON.parse(data);
console.log(sabData,"sabData")


const app = express();
app.use(express.json());
app.use(cors());
app.use((req,res,next)=>{
    console.log(req.method, req.path);
    next();
})

//get method
app.get('/products', (req, resp) => {
    return resp.status(200).send({
        Products: sabData
    });
});

//post method
app.post('/products/create', (req, resp) => {
    let createProduct = req.body;
    console.log(createProduct,"createProduct");
    sabData.products.push(createProduct);
    fs.writeFile("products.json", JSON.stringify(sabData), (err) => {
        if (err) throw err;
    }
    );
    return resp.status(200).send({
        message: 'Product created',
        Product: createProduct
    });
}
);



//update a product
app.put('/products/:productId', (req, resp) => {
    let id = req.params.productId;
    let index = sabData.products.findIndex(item => item.id == id);
    if(index == -1){
        return resp.status(404).send({
            message: 'Product not found'
        });
    }
    sabData.products[index] = req.body;
    fs.writeFile("products.json", JSON.stringify(sabData), (err) => {
        if (err) throw err;
    }
    );
    return resp.status(200).send({
        message: 'Product updated'
    });
}
);


//delete a product
app.delete('/products/:productId', (req, resp) => {
    let id = req.params.productId;
    let index = sabData.products.findIndex(item => item.id == id);
    if(index == -1){
        return resp.status(404).send({
            message: 'Product not found'
        });
    }
    sabData.products.splice(index, 1);
    fs.writeFile("products.json", JSON.stringify(sabData), (err) => {
        if (err) throw err;
    }
    );
    return resp.status(200).send({
        message: 'Product deleted'
    });
}
);





app.listen(9000, () => {
    console.log('Server is running on port 9000');
})