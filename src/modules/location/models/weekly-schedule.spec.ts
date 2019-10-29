import { WeeklyScheduleModel } from "./weekly-schedule.model"
import { transformAndValidateEntity } from "../../commons/"

describe("WeeklyScheduleModel", () => {
  const validate = (values?: object) =>
    transformAndValidateEntity(WeeklyScheduleModel, {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
      ...values,
    })
  const wrapErrorCase = async (fn: () => Promise<any>) => {
    let error
    try {
      await fn()
    } catch (e) {
      error = e
    }
    return error
  }
  it("should be defined when values is empty", async () => {
    expect(await validate()).toBeDefined()
  })
  it("should be defined when input values is fully filled", async () => {
    const values = {
      mon: [{ from: "00:00", to: "23:59" }],
      tue: [{ from: "01:02", to: "22:48" }],
      wed: [{ from: "03:04", to: "21:37" }],
      thu: [{ from: "05:06", to: "20:26" }],
      fri: [{ from: "07:08", to: "19:15" }],
      sat: [{ from: "09:10", to: "18:04" }],
      sun: [{ from: "10:11", to: "17:53" }],
    }
    expect(await validate(values)).toBeDefined()
  })
  it("should throw an error if root props are missing", async () => {
    const values = {
      mon: [{ from: "00:00", to: "23:59" }],
      sun: undefined,
    }
    const error = await wrapErrorCase(() => validate(values))
    expect(error).toStrictEqual([{ path: "sun", message: "sun must be an array" }])
  })
  it("should throw error if daily values are incorrect", async () => {
    const values = {
      mon: [{ from: "00.00", to: "99:99" }],
    }
    const error = await wrapErrorCase(() => validate(values))
    expect(error).toStrictEqual([
      { path: "mon[0].from", message: "from must match /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/ regular expression" },
      { path: "mon[0].to", message: "to must match /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/ regular expression" },
    ])
  })
  it("should throw error if daily has explicit or missing keys", async () => {
    const values = {
      mon: [{ morf: "00:00", to: "00:01" }],
    }
    const error = await wrapErrorCase(() => validate(values))
    expect(error).toStrictEqual([
      { path: "mon[0].from", message: "from must match /^$|^(([01][0-9])|(2[0-3])):[0-5][0-9]$/ regular expression" },
    ])
  })
})
