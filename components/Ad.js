import React, { useEffect } from "react"
import { pushCmd } from "../lib/gpt"

const Ad = ({ adUnit }) => {
  useEffect(() => {
    const viewport = [
      [1000, 300],
      [1000, 500],
      [980, 300],
      [980, 500],
      [970, 250]
    ]
    const sizeMapping = [
      [
        [1000, 0],
        [
          [1000, 300],
          [1000, 500],
          [980, 150],
          [980, 300],
          [980, 500],
          [970, 250]
        ]
      ],
      [
        [980, 0],
        [
          [980, 150],
          [980, 300],
          [980, 400],
          [980, 500],
          [970, 250]
        ]
      ],
      [
        [0, 0],
        [
          [320, 250],
          [320, 320],
          [300, 250]
        ]
      ]
    ]

    try {
      pushCmd(
        `/${process.env.NEXT_PUBLIC_GPT_NETWORK_CODE}/${adUnit}`,
        adUnit,
        viewport,
        sizeMapping,
      )
    } catch (err) {}
  }, [adUnit])

  return <div>{adUnit && <div id={adUnit} />}</div>
}

export default Ad
