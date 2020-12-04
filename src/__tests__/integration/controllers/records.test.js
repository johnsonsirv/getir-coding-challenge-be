/* eslint-disable no-undef */

const supertest = require('supertest');
const { isWithinInterval, parseISO } = require('date-fns');

const HOST_URL = 'http://localhost:5000/api/v1';
const request = supertest(HOST_URL);

const endPoint = '/records';

describe('POST /records', () => {
    describe('response body', () => {
        let requestBody = null;

        beforeEach(() => {
            requestBody = {
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: 2800,
            };
        });
        it('should return 200 with valid response body', async () => {
            const response = await request.post(endPoint).send(requestBody);
            const { records } = response.body;

            expect(response.body).toHaveProperty('code', 0);
            expect(response.body).toHaveProperty('msg', 'Success');
            expect(Array.isArray(records)).toBe(true);

            // validate individual items in record
            records.forEach(item => {
                expect(item).toHaveProperty('key');
                expect(item).toHaveProperty('totalCount');
            });
        });

        it('should return totalCount within range', async () => {
            const response = await request.post(endPoint).send(requestBody);
            const { records } = response.body;

            expect(response.body).toHaveProperty('code', 0);
            expect(response.body).toHaveProperty('msg', 'Success');

            records.forEach(item => {
                expect(item.totalCount).toBeGreaterThanOrEqual(requestBody.minCount);
                expect(item.totalCount).toBeLessThanOrEqual(requestBody.maxCount);
            });
        });

        it('should return createdAt within interval time range', async () => {
            const response = await request.post(endPoint).send(requestBody);
            const { records } = response.body;

            expect(response.body).toHaveProperty('code', 0);
            expect(response.body).toHaveProperty('msg', 'Success');

            records.forEach(item => {
                expect(
                    isWithinInterval(parseISO(item.createdAt), {
                        start: parseISO(requestBody.startDate),
                        end: parseISO(requestBody.endDate),
                    }),
                ).toBe(true);
            });
        });
    });

    describe('request body validations', () => {
        let requestBody = null;

        beforeEach(() => {
            requestBody = {
                startDate: '2016-01-26',
                endDate: '2018-02-02',
                minCount: 2700,
                maxCount: 2800,
            };
        });
        it('should fail for missing request body', async () => {
            const response = await request.post(endPoint).send({});

            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty('code', 1);
            expect(response.body.msg).toMatch(/failure/i);
        });

        it('should validate startDate format', async () => {
            requestBody.startDate = 'invalid date';

            const response = await request.post(endPoint).send(requestBody);

            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty('code', 1);
            expect(response.body.msg).toMatch(/failure/i);
        });

        it('should validate endDate format', async () => {
            requestBody.endDate = 'invalid date';

            const response = await request.post(endPoint).send(requestBody);

            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty('code', 1);
            expect(response.body.msg).toMatch(/failure/i);
        });

        it('should validate minCount format', async () => {
            requestBody.minCount = '0';

            const response = await request.post(endPoint).send(requestBody);

            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty('code', 1);
            expect(response.body.msg).toMatch(/failure/i);
        });

        it('should validate maxCount format', async () => {
            requestBody.minCount = '2800';

            const response = await request.post(endPoint).send(requestBody);

            expect(response.statusCode).toEqual(400);
            expect(response.body).toHaveProperty('code', 1);
            expect(response.body.msg).toMatch(/failure/i);
        });
    });
});
