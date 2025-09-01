import { expect, test } from '@playwright/test'
import { StatusCodes } from 'http-status-codes'
import { LoanCalculatorDto} from "../Dto/loan-calculator-dto"
const baseUrl = 'https://taotlus.bigbank.ee/api/v1/loan/calculate'

test('Test loan calculator API with empty body', async ({ request }) => {
    const response = await request.post(baseUrl, {})
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Test loan calculator API using minimum accepted values for amount and period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(6, 500)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    const responseBody = await response.json()
    expect.soft(responseBody.totalRepayableAmount).toBe(550.33)
    expect.soft(responseBody.monthlyPayment).toBe(91.73)
    expect.soft(responseBody.apr).toBe(169.8)
    expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('Test loan calculator API using maximum accepted values for amount and period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(120, 30000)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    const responseBody = await response.json()
    console.log(responseBody)
    expect.soft(responseBody.totalRepayableAmount).toBe(60351.24)
    expect.soft(responseBody.monthlyPayment).toBe(501.39)
    expect.soft(responseBody.apr).toBe(17.25)
    expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('Test loan calculator API using default values for amount and period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(60, 5000)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    const responseBody = await response.json()
    expect.soft(responseBody.totalRepayableAmount).toBe(7533.84)
    expect.soft(responseBody.monthlyPayment).toBe(125.57)
    expect.soft(responseBody.apr).toBe(19.67)
    expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('Test loan calculator API using out of boundaries values for amount', async ( {request}) => {
    const loanData = new LoanCalculatorDto(60, 499)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    const responseBody = await response.json()
    expect.soft(responseBody.totalRepayableAmount).toBe(967.19)
    expect.soft(responseBody.monthlyPayment).toBe(16.13)
    expect.soft(responseBody.apr).toBe(50.43)
    expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('Test loan calculator API using out of boundaries values for period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(5, 5000)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    const responseBody = await response.json()
    expect.soft(responseBody.totalRepayableAmount).toBe(5250.67)
    expect.soft(responseBody.monthlyPayment).toBe(1050.14)
    expect.soft(responseBody.apr).toBe(27.05)
    expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('Test loan calculator API using out of boundaries values for amount and period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(5, 499)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    const responseBody = await response.json()
    expect.soft(responseBody.totalRepayableAmount).toBe(541.97)
    expect.soft(responseBody.monthlyPayment).toBe(108.4)
    expect.soft(responseBody.apr).toBe(195.38)
    expect.soft(response.status()).toBe(StatusCodes.OK)
})

test('Test loan calculator API using 0 for amount', async ( {request}) => {
    const loanData = new LoanCalculatorDto(60, 0)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Test loan calculator API using 0 for period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(0, 5000)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Test loan calculator API using 0 for amount and period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(0, 0)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Test loan calculator API using negative value for amount', async ( {request}) => {
    const loanData = new LoanCalculatorDto(60, -1)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Test loan calculator API using negative value for period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(-1, 5000)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Test loan calculator API using negative value for amount and period', async ( {request}) => {
    const loanData = new LoanCalculatorDto(-1, -1)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.INTERNAL_SERVER_ERROR)
})

test('Test loan calculator API using string for amount', async ( {request}) => {
    const loanData = new LoanCalculatorDto(60, '5000')
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})

test('Test loan calculator API using string for period', async ( {request}) => {
    const loanData = new LoanCalculatorDto('60', 5000)
    const response = await request.post(baseUrl, {
        data: loanData,
    })
    expect.soft(response.status()).toBe(StatusCodes.BAD_REQUEST)
})