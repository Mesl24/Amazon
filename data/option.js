export const option = [{
    id : '1',
    optionDate : 7,
    priceCents : '0'
},
{
    id: '2',
    optionDate: 3,
    priceCents: '499'
},
{
    id: '3',
    optionDate: 1,
    priceCents: '999'
}]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;

    option.forEach((option) => {
        if(option.id === deliveryOptionId){
            deliveryOption = option
        }
    });

    return deliveryOption || deliveryOption[0];
}