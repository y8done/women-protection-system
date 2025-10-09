import { useEffect, useState } from 'react';

// Custom hook to detect a device shake gesture.
export const useShake = (onShake, threshold = 15, timeout = 1000) => {
  const [lastShakeTime, setLastShakeTime] = useState(0);

  useEffect(() => {
    let lastX, lastY, lastZ;
    let moveCounter = 0;

    const handleDeviceMotion = (event) => {
      const { acceleration } = event;
      const currentTime = new Date().getTime();

      if ((currentTime - lastShakeTime) > timeout) {
        if (lastX !== null && lastY !== null && lastZ !== null) {
          const deltaX = Math.abs(acceleration.x - lastX);
          const deltaY = Math.abs(acceleration.y - lastY);
          const deltaZ = Math.abs(acceleration.z - lastZ);
          
          // Check if acceleration change is significant
          if ((deltaX + deltaY + deltaZ) > threshold) {
            moveCounter++;
            if (moveCounter > 1) { // Requires at least 2 sharp movements
              onShake();
              setLastShakeTime(currentTime);
              moveCounter = 0;
            }
          } else {
            moveCounter = 0;
          }
        }
        lastX = acceleration.x;
        lastY = acceleration.y;
        lastZ = acceleration.z;
      }
    };

    // Check for permissions and add event listener
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      // iOS 13+ devices need to request permission
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          }
        })
        .catch(console.error);
    } else {
      // Non-iOS 13+ devices
      window.addEventListener('devicemotion', handleDeviceMotion);
    }

    // Cleanup
    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [onShake, threshold, timeout, lastShakeTime]);
};
