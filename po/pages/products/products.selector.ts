export default class ProductsSelectors{
    BAR_NOTI_SUCCESS = "//div[@id='bar-notification']/p[contains(text(),'The product has been added')]";
    SHOPPING_CART_LINK_IN_NOTI = "//div[@id='bar-notification']//a[@href='/cart']";
    PROD_DETAILS_PAGE_ADD_TO_CART_BTN ="//input[@value='Add to cart' and contains(@id,'add-to-cart-button')]"
}