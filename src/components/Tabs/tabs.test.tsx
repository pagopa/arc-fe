import { renderHook, act } from "@testing-library/react";
import useTabs from './useTabs';

describe("useTabs hook", () => {
  it("should return the inital active tab state correctly", () => {
    const { result } = renderHook(() => useTabs(1))
    expect(result.current.activeTab).toBe(1)
  })

  it("should return the inital 0 index active tab state correctly passing undefined to useTabs", () => {
    const { result } = renderHook(() => useTabs(undefined))
    expect(result.current.activeTab).toBe(0)
  })

  it("should change correctly the active tab state calling the changeActiveTab function", () => {
    const { result } = renderHook(() => useTabs(undefined))
    act(() => {
      result.current.changeActiveTab(3)
    })
    expect(result.current.activeTab).toBe(3)
  })
})
