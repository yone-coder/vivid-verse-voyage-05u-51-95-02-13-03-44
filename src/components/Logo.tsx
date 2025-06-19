
import React from 'react';
import Lottie from 'lottie-react';

interface LogoProps {
  className?: string;
  animate?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "", animate = false }) => {
  // Simple loading animation data - you can replace this with your own Lottie JSON
  const animationData = {
    "v": "5.7.4",
    "fr": 60,
    "ip": 0,
    "op": 120,
    "w": 200,
    "h": 200,
    "nm": "Loading",
    "ddd": 0,
    "assets": [],
    "layers": [
      {
        "ddd": 0,
        "ind": 1,
        "ty": 4,
        "nm": "Circle",
        "sr": 1,
        "ks": {
          "o": {"a": 0, "k": 100},
          "r": {
            "a": 1,
            "k": [
              {"i": {"x": [0.833], "y": [0.833]}, "o": {"x": [0.167], "y": [0.167]}, "t": 0, "s": [0]},
              {"t": 120, "s": [360]}
            ]
          },
          "p": {"a": 0, "k": [100, 100, 0]},
          "a": {"a": 0, "k": [0, 0, 0]},
          "s": {"a": 0, "k": [100, 100, 100]}
        },
        "ao": 0,
        "shapes": [
          {
            "ty": "gr",
            "it": [
              {
                "d": 1,
                "ty": "el",
                "s": {"a": 0, "k": [80, 80]},
                "p": {"a": 0, "k": [0, 0]}
              },
              {
                "ty": "st",
                "c": {"a": 0, "k": [0.8, 0.2, 0.2, 1]},
                "o": {"a": 0, "k": 100},
                "w": {"a": 0, "k": 8},
                "lc": 2,
                "lj": 2
              },
              {
                "ty": "tr",
                "p": {"a": 0, "k": [0, 0]},
                "a": {"a": 0, "k": [0, 0]},
                "s": {"a": 0, "k": [100, 100]},
                "r": {"a": 0, "k": 0},
                "o": {"a": 0, "k": 100}
              }
            ]
          }
        ],
        "ip": 0,
        "op": 120,
        "st": 0,
        "bm": 0
      }
    ]
  };

  return (
    <div className={className}>
      <Lottie 
        animationData={animationData}
        style={{ width: 200, height: 200 }}
        loop={true}
        autoplay={animate}
      />
    </div>
  );
};

export default Logo;
