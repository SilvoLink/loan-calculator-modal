import { test, expect } from '@playwright/test';
import {LoanCalculatorPage} from "../Pages/loan-calculator-page";

let loanCalculatorPage: LoanCalculatorPage

test.beforeEach(async ({page}) => {
  loanCalculatorPage = new LoanCalculatorPage(page)
  await loanCalculatorPage.openPage()
})

test('Test „Laenusumma” and „Periood” fields using default values', async () => {
  await loanCalculatorPage.verifyAmountAndPeriod('5,000', '60')
  await loanCalculatorPage.clickContinue()
  await expect.soft(loanCalculatorPage.verifyAmountOnModalOpenButton).toContainText('5000')
})

test('Test „Laenusumma” and „Periood” fields using provided values', async () => {
  const amount = '10000'
  const period = '84'
  const verifiedAmount = '10,000'
  await loanCalculatorPage.provideAmountAndPeriod(amount, period)
  await loanCalculatorPage.verifyAmountAndPeriod(verifiedAmount, period)
  await loanCalculatorPage.clickContinue()
  await expect.soft(loanCalculatorPage.verifyAmountOnModalOpenButton).toContainText(amount)
})

test('Test „Laenusumma” and „Periood” value minimum boundaries', async () => {
  await loanCalculatorPage.provideAmountAndPeriod('499', '5')
  await loanCalculatorPage.verifyAmountAndPeriod('500', '6')
  await loanCalculatorPage.clickContinue()
  await expect.soft(loanCalculatorPage.verifyAmountOnModalOpenButton).toContainText('500')
})

test('Test „Laenusumma” and „Periood” value maximum boundaries', async () => {
  await loanCalculatorPage.provideAmountAndPeriod('30001', '121')
  await loanCalculatorPage.verifyAmountAndPeriod('30,000', '120')
  await loanCalculatorPage.clickContinue()
  await expect.soft(loanCalculatorPage.verifyAmountOnModalOpenButton).toContainText('30000')
})

test('Test „Laenusumma” and „Periood” with value 0', async () => {
  await loanCalculatorPage.provideAmountAndPeriod('0', '0')
  await loanCalculatorPage.verifyAmountAndPeriod('500', '6')
  await loanCalculatorPage.clickContinue()
  await expect.soft(loanCalculatorPage.verifyAmountOnModalOpenButton).toContainText('500')
})

test('Test „Laenusumma” and „Periood” sliders', async ({}) => {
  await loanCalculatorPage.moveAmountSliderLeft('5,000', '2,730')
  await loanCalculatorPage.moveAmountSliderRight('2,730', '15,250')
  await loanCalculatorPage.movePeriodSliderLeft('60', '33')
  await loanCalculatorPage.movePeriodSliderRight('33', '63')
})