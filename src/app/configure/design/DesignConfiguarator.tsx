"use client"

import HandleComponent from "@/components/HandleComponent";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatPrice } from "@/lib/utils";
import { configuration } from "@prisma/client";
import NextImage from "next/image";
import { Rnd } from "react-rnd"
import { Description, Radio, RadioGroup } from "@headlessui/react"
import { useRef, useState } from "react";
import { COLORS, FINISHES, MATERIALS, MODELS } from "@/validators/option-validator";
import { Label } from "@/components/ui/label";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, ChevronsUpDown } from "lucide-react";
import { BASE_PRICE } from "@/config/products";
import { useUploadThing } from "@/lib/uploadthing";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { SaveConfigArgs, saveConfig as _saveConfig } from "./actions";
import { useRouter } from "next/navigation";

interface DesignConfiguratorProps {
  configId: string
  imageUrl: string
  imageDimensions: { width: number; height: number }
}

const DesignConfigurator = ({ 
  configId, 
  imageUrl, 
  imageDimensions 
}: DesignConfiguratorProps) => {

  const [options, setOptions] = useState<{
    color: (typeof COLORS)[number]
    model: (typeof MODELS.options)[number]
    material: (typeof MATERIALS.options)[number]
    finish: (typeof FINISHES.options)[number]
  }>({
    color: COLORS[0],
    model: MODELS.options[0],
    material: MATERIALS.options[0],
    finish: FINISHES.options[0],
  })

  const [renderedDimension, setRenderedDimension] = useState({
    width: imageDimensions.width / 4,
    height: imageDimensions.height / 4,
  })

  const [renderedPosition, setRenderedPosition] = useState({
    x: 250,
    y: 250,
  })

  const phoneCaseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { startUpload } = useUploadThing("imageUploader")
  const { toast } = useToast()
  const router = useRouter()

  const {mutate: saveConfig} = useMutation({
    mutationKey: ["save-config"],
    mutationFn: async (args: SaveConfigArgs) => {
      await Promise.all([ saveConfiguration(), _saveConfig(args) ])
    },
    onError: () => {
      toast({
        title: "An error occurred",
        description: "There was an error saving, please try again.",
        variant: "destructive"
      })
    },
    onSuccess: () => {
      router.push(`/configure/preview?id=${configId}`)
    },
  })

  async function saveConfiguration() {
    try {
      const { left: caseLeft, top: caseTop, width, height } = phoneCaseRef.current!.getBoundingClientRect()
      const { left: containerLeft, top: containerTop } = containerRef.current!.getBoundingClientRect()

      const leftOffset = caseLeft - containerLeft
      const topOffset = caseTop - containerTop

      const actualX = renderedPosition.x - leftOffset
      const actualY = renderedPosition.y - topOffset

      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")

      const userImage = new Image()
      userImage.crossOrigin = "anonymous"
      userImage.src = imageUrl
      await new Promise((resolve) => (userImage.onload = resolve))

      ctx?.drawImage(
        userImage,
        actualX,
        actualY,
        renderedDimension.width,
        renderedDimension.height,
      )

      const base64 = canvas.toDataURL()
      const base64Data = base64.split(",")[1]

      const blob = base64ToBlob(base64Data, "image/png")
      const file = new File([blob], "userCroppedImage.png", {type: "image/png"})

      await startUpload([file], {configId})

    } catch (error) {
      toast({
        title: "Error uploading",
        description: "Something went wrong, please try again",
        variant: "destructive"
      })
    }
  }

  function base64ToBlob(base64Data: string, mimeType: string) {
    const byteCharacters = atob(base64Data)
    const byteNumbers = new Array(byteCharacters.length)

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    return new Blob([byteArray], {type: mimeType})
  }

  return (
    <div className='relative mt-20 grid grid-cols-1 lg:grid-cols-3 mb-20 pb-20'>
      <div 
        ref={containerRef} 
        className="relative h-[37.5rem] overflow-hidden col-span-2 w-full max-w-4xl flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <div className='relative w-60 bg-opacity-50 pointer-events-none aspect-[896/1831]'>
          <AspectRatio
            ref={phoneCaseRef}
            ratio={896 / 1831}
            className='pointer-events-none relative z-50 w-full'>
            <NextImage
              fill
              alt='phone image'
              src='/phone-template.png'
              className='pointer-events-none z-50 select-none'
            />
          </AspectRatio>

          {/* gray background area */}
          <div className='absolute z-40 inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px] shadow-[0_0_0_99999px_rgba(229,231,235,0.6)]' />
          
          {/* phone background color */}
          <div
            className={cn(
              'absolute inset-0 left-[3px] top-px right-[3px] bottom-px rounded-[32px]',
              `bg-${options.color.tw}`
            )}
          />
        </div>

        {/* draggable customer image */}
        <Rnd default={{
          x: 250,
          y: 250,
          height: imageDimensions.height / 4,
          width: imageDimensions.width / 4,
          }}
          onResizeStop={(_, __, ref, ___,{ x, y }) => {
            setRenderedDimension({
              height: parseInt(ref.style.height.slice(0, -2)),
              width: parseInt(ref.style.width.slice(0, -2)),
            })
            setRenderedPosition({x, y});
          }}
          onDragStop={(_, data) => {
            const {x, y} = data
            setRenderedPosition({x, y});
          }}
          className="absolute z-20"
          lockAspectRatio
          resizeHandleComponent={{
            bottomLeft: <HandleComponent />,
            bottomRight: <HandleComponent />,
            topLeft: <HandleComponent />,
            topRight: <HandleComponent />,
          }}
        >
          <div className="relative w-full h-full">
            <NextImage 
              fill 
              src={imageUrl} 
              alt="your image" 
              className="pointer-events-none"
            />
          </div>
        </Rnd>
      </div>

      <div className="h-[37.5rem] flex flex-col bg-white w-full col-span-full lg:col-span-1">
        <ScrollArea className="relative flex-1 overflow-auto">
          <div 
            aria-hidden="true" 
            className="z-10 absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white pointer-events-none"
          />

          <div className="px-8 pb-12 pt-8">
            <h2 className="font-bold tracking-tight text-3xl">
              Customize your case
            </h2>

            <div className="w-full h-px bg-zinc-200 my-6"/>

            <div className="relative mt-4 h-full flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <RadioGroup 
                  value={options.color} 
                  onChange={(value) => {
                    setOptions((prev) => ({
                      ...prev,
                      color: value,
                    }))
                  }}
                >
                  <Label>Color: {options.color.label}</Label>
                  <div className=" mt-3 flex items-center space-x-3">
                    {COLORS.map((color) => (
                      <Radio 
                        key={color.label} 
                        value={color}
                        className={({checked}) => cn("relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 active:ring-0 focus:ring-0 active:outline-none focus:outline-none border-2 border-transparent", {
                          [`border-${color.tw}`]: checked,
                        })}
                      >
                        <span className={`bg-${color.tw} h-8 w-8 rounded-full border border-black border-opacity-10`}/>
                        {color.label}
                      </Radio>
                    ))}
                  </div>
                </RadioGroup>

                <div className="flex flex-col relative gap-3 w-full">
                  <Label>Model:</Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="outline"
                        role="combobox" 
                        className="w-full justify-between"
                      >
                        {options.model.label}
                        <ChevronsUpDown className="h-5 w-5 shrink-0 opacity-70"/> 
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-full">
                      {MODELS.options.map((model) => (
                        <DropdownMenuItem 
                          key={model.label}
                          className={cn(
                            "flex text-sm gap-1 items-center p-1.5 cursor-default hover:bg-zinc-100",
                            {
                              "bg-zinc-100": model.label === options.model.label
                            }
                          )}
                          onClick={() => {
                            setOptions((prev) => ({ ...prev, model }))
                          }}
                        >
                          <Check className={cn(
                            "h-4 w-4 mr-2", 
                            model.label === options.model.label ? "opacity-100" : 'opacity-0'
                            )}
                          /> 
                          {model.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {[MATERIALS, FINISHES].map(({name, options: selectableOptions}) => (
                  <RadioGroup 
                    key={name} 
                    value={options[name]}
                    onChange={(value) => {
                      setOptions((prev) => ({
                        ...prev, 
                        //name: material or finish
                        [name]: value
                      }))
                    }}
                  >
                    <Label>
                      {name.slice(0, 1).toUpperCase() + name.slice(1)}
                    </Label>
                    <div className="mt-3 space-y-4">
                      {selectableOptions.map((option) => (
                        <RadioGroup.Option 
                          key={option.value} 
                          value={option}
                          className={({checked, active} ) => cn(
                            "relative block cursor-pointer rounded-lg bg-white px-6 py-4 shadow-sm border-2 border-zinc-200 focus:outline-none ring-0 focus:ring-0 outline-none sm:flex sm:justify-between",
                            {
                              "border-primary": checked || active
                            }
                          )}
                        >
                          <span className="flex items-center">
                            <span className="flex flex-col text-sm">
                              <Label className="font-medium text-gray-900">
                                {option.label}
                              </Label>

                              {option.description && (
                                <Description>
                                  <span className="block sm:inline text-gray-500">
                                    {option.description}
                                  </span>
                                </Description>
                              )}
                            </span>
                          </span>

                          <Description className="mt-2 flex sm:flex-col text-sm sm:ml-4 slide-in-from-bottom-0 sm:text-right">
                            <span className="font-medium text-gray-900">
                              {formatPrice(option.price)}
                            </span>
                          </Description>
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                ))}
              </div>
            </div>

          </div>
        </ScrollArea>

        <div className="h-16 w-full px-8 bg-white">
          <div className="h-px w-full bg-zinc-200"/>
          <div className="w-full h-full flex justify-end items-center">
            <div className="flex w-full gap-6 items-center">
              <p className="font-medium whitespace-nowrap">
                {formatPrice(BASE_PRICE + options.finish.price + options.material.price)}
              </p>

              <Button 
                onClick={() => saveConfig({
                  configId,
                  color: options.color.value,
                  material: options.material.value,
                  model: options.model.value,
                  finish: options.finish.value,
                })} 
                size="sm" 
                className="w-full"
              >
                Continue
                <ArrowRight className="h-4 w-4 ml-1.5 inline"/>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default DesignConfigurator