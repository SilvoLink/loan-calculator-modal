export class LoanCalculatorDto {
    currency: string
    productType: string
    maturity: any
    administrationFee: number
    conclusionFee: number
    amount: any
    monthlyPaymentDay: number
    interestRate: number

    constructor(
        maturity: any,
        amount: any,
    ) {
        this.currency = 'EUR'
        this.productType = 'SMALL_LOAN_EE01'
        this.maturity = maturity
        this.administrationFee = 3.99
        this.conclusionFee = 100
        this.amount = amount
        this.monthlyPaymentDay = 15
        this.interestRate = 15.5
    }
}