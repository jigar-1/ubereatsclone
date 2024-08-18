module.exports = mongoose => {
    const Order = mongoose.model(
        "order",
        mongoose.Schema(
            {
                restaurantId: { type: String },
                restName: { type: String },
                customer: {
                    customerId: { type: String },
                    name: { type: String },
                    profilePic: { type: String },
                    phoneno: { type: String },
                    street: { type: String },
                    city: { type: String },
                    state: { type: String },
                    country: { type: String },
                    zipcode: { type: String }

                },
                orderTime: { type: Date },
                orderStatus: { type: String },
                orderFilter: { type: String },
                orderMode: { type: String },
                total: { type: Number },
                orderItems: [
                    {
                        dishId: { type: String },
                        dishName: { type: String },
                        dishQuantity: { type: Number },
                        itemPrice: { type: Number },
                    }
                ]
                ,
                orderNote: { type: String }
            },
            { timestamps: true },
            {
                versionKey: false
            }
        )
    );
    return Order;
};


