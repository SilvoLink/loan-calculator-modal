import { expect, Locator, Page } from '@playwright/test'

export class LoanCalculatorPage {
    readonly page: Page
    readonly url: string
    readonly calculatorTitle: Locator
    readonly loanAmount: Locator
    readonly loanAmountField: Locator
    readonly loanAmountSlider: Locator
    readonly amountSliderLeft: Locator
    readonly amountSliderRight: Locator
    readonly loanPeriod: Locator
    readonly loanPeriodField: Locator
    readonly loanPeriodSlider: Locator
    readonly periodSliderLeft: Locator
    readonly periodSliderRight: Locator
    readonly monthlyPayment: Locator
    readonly continueButton: Locator
    readonly verifyAmountOnModalOpenButton: Locator

    constructor(page: Page) {
        this.page = page
        this.url = 'https://laenutaotlus.bigbank.ee/?amount=5000&period=60&productName=SMALL_LOAN&loanPurpose=DAILY_SETTLEMENTS'
        this.calculatorTitle = page.getByText('Vali sobiv summa ja periood')
        this.loanAmount = page.locator('input[name="header-calculator-amount"]')
        this.loanAmountField = page.locator('(//input[@id=\'header-calculator-amount\'])[1]')
        this.loanAmountSlider = page.getByLabel('Laenusumma').getByRole('slider')
        this.amountSliderLeft = page.getByLabel('Laenusumma').locator('div').nth(1)
        this.amountSliderRight = page.getByLabel('Laenusumma').locator('div').nth(4)
        this.loanPeriod = page.locator('input[name="header-calculator-period"]')
        this.loanPeriodField = page.locator('(//input[@id=\'header-calculator-period\'])[1]')
        this.loanPeriodSlider = page.getByLabel('Periood', { exact: true }).getByRole('slider').locator('div')
        this.periodSliderLeft = page.getByLabel('Periood', { exact: true }).locator('div').nth(1)
        this.periodSliderRight = page.getByLabel('Periood', { exact: true }).locator('div').nth(4)
        this.monthlyPayment = page.locator('(//div[@class=\'bb-labeled-value__value\'])[1]')
        this.continueButton = page.getByTestId('bb-overlay').getByTestId('bb-button')
        this.verifyAmountOnModalOpenButton = page.locator('(//div[@class=\'bb-edit-amount__amount\'])[1]')
    }

    async openPage() {
        await this.page.goto(this.url)
        await expect.soft(this.calculatorTitle).toBeVisible()
    }

    async provideAmountAndPeriod(amount:string, period:string) {
        await this.loanAmount.fill(amount)
        await this.loanPeriod.fill(period)
        await this.monthlyPayment.click()
    }

    async verifyAmountAndPeriod(verifiedAmount:string, verifiedPeriod:string) {
        await expect.soft(this.loanAmountField).toHaveValue(verifiedAmount)
        await expect.soft(this.loanPeriodField).toHaveValue(verifiedPeriod)
        expect(this.monthlyPayment).toBeDefined()
    }

    async clickContinue() {
        await this.continueButton.click()
    }

    async moveAmountSliderLeft(amountBefore:string, amountAfter:string): Promise<void> {
        await expect.soft(this.loanAmountField).toHaveValue(amountBefore)
        await this.loanAmountSlider.dragTo(this.amountSliderLeft)
        await expect.soft(this.loanAmountField).toHaveValue(amountAfter)
    }

    async moveAmountSliderRight(amountBefore:string, amountAfter:string): Promise<void> {
        await expect.soft(this.loanAmountField).toHaveValue(amountBefore)
        await this.loanAmountSlider.dragTo(this.amountSliderRight)
        await expect.soft(this.loanAmountField).toHaveValue(amountAfter)
    }

    async movePeriodSliderLeft(periodBefore:string, periodAfter:string): Promise<void> {
        await expect.soft(this.loanPeriodField).toHaveValue(periodBefore)
        await this.loanPeriodSlider.dragTo(this.periodSliderLeft)
        await expect.soft(this.loanPeriodField).toHaveValue(periodAfter)
    }

    async movePeriodSliderRight(periodBefore:string, periodAfter:string): Promise<void> {
        await expect.soft(this.loanPeriodField).toHaveValue(periodBefore)
        await this.loanPeriodSlider.dragTo(this.periodSliderRight)
        await expect.soft(this.loanPeriodField).toHaveValue(periodAfter)
    }
}