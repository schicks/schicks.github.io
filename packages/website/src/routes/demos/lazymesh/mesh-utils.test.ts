import { describe, it, expect, vi } from 'vitest'
import { withTimeout, copyToClipboard, constrain } from './mesh-utils'

describe('mesh-utils', () => {
  describe('withTimeout', () => {
    it('should resolve with the promise value when promise resolves first', async () => {
      const promise = Promise.resolve('success')
      const result = await withTimeout(promise, 1000)
      expect(result).toBe('success')
    })

    it('should reject with timeout error when timeout occurs first', async () => {
      const promise = new Promise((resolve) => setTimeout(resolve, 1000))
      await expect(withTimeout(promise, 100)).rejects.toThrow('Connection timeout')
    })

    it('should reject with original error when promise rejects first', async () => {
      const promise = Promise.reject(new Error('original error'))
      await expect(withTimeout(promise, 1000)).rejects.toThrow('original error')
    })
  })

  describe('copyToClipboard', () => {
    it('should use navigator.clipboard when available', async () => {
      const mockWriteText = vi.fn().mockResolvedValue(undefined)
      Object.assign(navigator, {
        clipboard: {
          writeText: mockWriteText
        }
      })

      await copyToClipboard('test text')
      expect(mockWriteText).toHaveBeenCalledWith('test text')
    })

    it('should use fallback method when navigator.clipboard is not available', async () => {
      // Mock document methods
      const mockTextArea = {
        value: '',
        select: vi.fn(),
        style: {}
      }
      const mockAppendChild = vi.fn()
      const mockRemoveChild = vi.fn()
      const mockExecCommand = vi.fn().mockReturnValue(true)

      vi.spyOn(document, 'createElement').mockReturnValue(mockTextArea as any)
      vi.spyOn(document.body, 'appendChild').mockImplementation(mockAppendChild)
      vi.spyOn(document.body, 'removeChild').mockImplementation(mockRemoveChild)
      
      // Mock execCommand on document since it doesn't exist in jsdom
      Object.defineProperty(document, 'execCommand', {
        value: mockExecCommand,
        writable: true
      })

      // Remove navigator.clipboard
      Object.assign(navigator, { clipboard: undefined })

      await copyToClipboard('fallback text')

      expect(mockTextArea.value).toBe('fallback text')
      expect(mockTextArea.select).toHaveBeenCalled()
      expect(mockAppendChild).toHaveBeenCalledWith(mockTextArea)
      expect(mockExecCommand).toHaveBeenCalledWith('copy')
      expect(mockRemoveChild).toHaveBeenCalledWith(mockTextArea)
    })
  })

  describe('constrain', () => {
    it('should return the value when within bounds', () => {
      expect(constrain(50, 0, 100)).toBe(50)
    })

    it('should return min when value is below min', () => {
      expect(constrain(-10, 0, 100)).toBe(0)
    })

    it('should return max when value is above max', () => {
      expect(constrain(150, 0, 100)).toBe(100)
    })

    it('should handle edge cases', () => {
      expect(constrain(0, 0, 100)).toBe(0)
      expect(constrain(100, 0, 100)).toBe(100)
    })
  })
}) 