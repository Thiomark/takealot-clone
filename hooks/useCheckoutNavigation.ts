import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/providers/CartProvider";
import { CheckoutData } from "@/types/checkout";

interface CheckoutProcess {
  currentStep: number;
  isActive: boolean;
  goToNextStep: () => void;
  startCheckout: () => void;
  endCheckout: () => void;
  completedSteps: Partial<CheckoutData>;
}

function useCheckoutNavigation(
  externalData: Partial<CheckoutData> = {}
): CheckoutProcess {
  const [checkoutState, setCheckoutState] = useState<{
    currentStep: number;
    isActive: boolean;
  }>({
    currentStep: 0,
    isActive: false,
  });
  const router = useRouter();
  const {
    cart,
    personalInfo,
    shippingAddress,
    billingAddress,
    shippingMethod,
  } = useCart();

  // Define the steps of the checkout process in order
  const stepKeys: (keyof CheckoutData)[] = [
    "shippingMethod",
    "shippingAddress",
    "billingAddress",
    "review",
    "payment",
    "confirmation",
  ];

  const checkoutData: CheckoutData = useMemo(
    () => ({
      cart: cart.length > 0,
      userStep: Object.values(personalInfo).some((value) => value !== ""),
      shippingAddress: Object.values(shippingAddress).some(
        (value) => value !== ""
      ),
      billingAddress: Object.values(billingAddress).some(
        (value) => value !== ""
      ),
      shippingMethod: shippingMethod.type !== undefined,
      review: externalData.review ?? false,
      payment: externalData.payment ?? false,
      confirmation: externalData.confirmation ?? false,
    }),
    [
      cart,
      personalInfo,
      shippingAddress,
      billingAddress,
      shippingMethod,
      externalData,
    ]
  );

  const determineNextStep = useCallback((): number => {
    let nextStep = checkoutState.currentStep;
    while (nextStep < stepKeys.length && checkoutData[stepKeys[nextStep]]) {
      nextStep++;
    }
    return nextStep;
  }, [checkoutState.currentStep, checkoutData, stepKeys]);

  useEffect(() => {
    const isCheckoutRoute = router.pathname.startsWith("/buy");
    if (isCheckoutRoute && !checkoutState.isActive) {
      setCheckoutState((prevState) => ({ ...prevState, isActive: true }));
    }

    if (checkoutState.isActive) {
      const stepRoutes: { [K in keyof Partial<CheckoutData>]: string } = {
        cart: "/cart",
        userStep: "/buy/delivery/addresses/add",
        shippingAddress: "/buy/delivery/addresses/add",
        billingAddress: "/buy/delivery/addresses/add",
        shippingMethod: "/buy/delivery/methods",
        review: "/buy/review",
        payment: "/payment",
        confirmation: "/confirmation",
      };

      const currentStepKey = stepKeys[
        checkoutState.currentStep
      ] as keyof Partial<CheckoutData>;
      const nextRoute = stepRoutes[currentStepKey];
      if (nextRoute && router.pathname !== nextRoute) {
        router.push(nextRoute);
      }
    }
  }, [router, checkoutState, stepKeys]);

  const goToNextStep = useCallback(() => {
    setCheckoutState((prevState) => ({
      ...prevState,
      currentStep:
        determineNextStep() < stepKeys.length ? determineNextStep() : 0,
    }));
  }, [determineNextStep, stepKeys.length]);

  const startCheckout = useCallback(() => {
    setCheckoutState({ currentStep: determineNextStep(0), isActive: true });
  }, [determineNextStep]);

  const endCheckout = useCallback(() => {
    setCheckoutState({ currentStep: 0, isActive: false });
  }, []);

  const completedSteps = useMemo(() => {
    const stepsCompletion: Partial<CheckoutData> = {};
    for (const step of stepKeys) {
      stepsCompletion[step] = checkoutData[step];
    }
    return stepsCompletion;
  }, [checkoutData, stepKeys]);

  return {
    currentStep: checkoutState.currentStep,
    isActive: checkoutState.isActive,
    goToNextStep,
    startCheckout,
    endCheckout,
    completedSteps,
  };
}

export default useCheckoutNavigation;
