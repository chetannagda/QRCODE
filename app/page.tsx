"use client"
import '@/styles/globals.css';

import { useState, useRef } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import * as htmlToImage from 'html-to-image'

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://lakecityproperties.in")
  const [qrCode, setQRCode] = useState("https://lakecityproperties.in")
  const [color, setColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [size, setSize] = useState(200)
  const [errorCorrection, setErrorCorrection] = useState("M")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const qrCodeRef = useRef<HTMLDivElement>(null)

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault()
    setQRCode(url)
  }

  const downloadSVG = () => {
    if (qrCodeRef.current) {
      htmlToImage.toSvg(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = 'qr-code.svg'
          link.click()
        })
        .catch((error) => {
          console.error('Error downloading SVG:', error)
        })
    }
  }

  const downloadPNG = () => {
    if (qrCodeRef.current) {
      htmlToImage.toPng(qrCodeRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = 'qr-code.png'
          link.click()
        })
        .catch((error) => {
          console.error('Error downloading PNG:', error)
        })
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <style jsx>{`
        .close-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #333;
        }

        .close-button:hover {
          color: #000;
        }

        /* From Uiverse.io by gharsh11032000 */
        .button {
          position: relative;
          overflow: hidden;
          height: 3rem;
          padding: 0 2rem;
          border-radius: 1.5rem;
          background: #000;
          background-size: 400%;
          color: #fff;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .button:hover::before {
          transform: scaleY(1);
        }

        .button-content {
          position: relative;
          z-index: 1;
        }

        .button::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          transform: scaleY(0);
          transform-origin: bottom;
          width: 100%;
          height: inherit;
          border-radius: inherit;
          background: linear-gradient(
            82.3deg,
            rgba(150, 93, 233, 1) 10.8%,
            rgba(99, 88, 238, 1) 94.3%
          );
          transition: all 0.6s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .button:active {
          scale: 0.9;
        }
      `}</style>
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">QR Code Generator by CHETAN NAGDA</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={generateQRCode} className="space-y-4">
            <div>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="Enter a URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color">QR Code Color</Label>
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-full h-10"
                />
              </div>
              <div>
                <Label htmlFor="backgroundColor">Background Color</Label>
                <Input
                  id="backgroundColor"
                  type="color"
                  value={backgroundColor}
                  onChange={(e) => setBackgroundColor(e.target.value)}
                  className="w-full h-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="size">
                Size: {size}x{size}
              </Label>
              <Slider
                id="size"
                min={100}
                max={400}
                step={10}
                value={[size]}
                onValueChange={(value) => setSize(value[0])}
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="errorCorrection">Error Correction Level</Label>
              <Select value={errorCorrection} onValueChange={setErrorCorrection}>
                <SelectTrigger id="errorCorrection">
                  <SelectValue placeholder="Select error correction level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L">Low (7%)</SelectItem>
                  <SelectItem value="M">Medium (15%)</SelectItem>
                  <SelectItem value="Q">Quartile (25%)</SelectItem>
                  <SelectItem value="H">High (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              Generate QR Code
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col items-center">
          {qrCode && (
            <div className="mt-4" ref={qrCodeRef}>
              <QRCodeSVG
                value={qrCode}
                size={size}
                fgColor={color}
                bgColor={backgroundColor}
                level={errorCorrection}
                includeMargin={true}
              />
            </div>
          )}
          <div className="mt-4 flex space-x-4">
            <button className="button" onClick={openModal}>
              <span className="button-content">Download</span>
            </button>
          </div>
        </CardFooter>
      </Card>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg relative">
            <button onClick={closeModal} className="close-button">
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Download QR Code</h2>
            <div className="flex space-x-4">
              <Button onClick={downloadSVG}>Download SVG</Button>
              <Button onClick={downloadPNG}>Download PNG</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

