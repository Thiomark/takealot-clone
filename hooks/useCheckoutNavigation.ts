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

  // Define the steps of the checkout process in the order they should be completed.
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
      review: externalData.review ?? false, // Provide default boolean values
      payment: externalData.payment ?? false,
      confirmation: externalData.confirmation ?? false,
      // If there are other fields in externalData that might not be provided, ensure they have defaults too
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

  useEffect(() => {
    // Redirect the user to the appropriate page based on the current step of the checkout process.
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

      const nextStep = determineNextStep(checkoutState.currentStep);
      const nextStepKey = stepKeys[nextStep] as keyof Partial<CheckoutData>;
      const nextRoute = stepRoutes[nextStepKey];

      if (nextRoute && router.pathname !== nextRoute) {
        router.push(nextRoute);
      }
    }
  }, [checkoutState, router]);

  // Determine the next step in the checkout process that hasn't been completed yet.
  const determineNextStep = (currentStep: number): number => {
    let nextStep = currentStep;
    // Loop to find the next unfilled step.
    while (nextStep < stepKeys.length && checkoutData[stepKeys[nextStep]]) {
      nextStep++;
    }
    return nextStep;
  };

  // Calculate which steps have been completed using the checkoutData.
  const completedSteps = useMemo(() => {
    const stepsCompletion: Partial<CheckoutData> = {};
    // Populate the stepsCompletion object with the completion status of each step.
    for (const step of stepKeys) {
      stepsCompletion[step] = checkoutData[step];
    }
    return stepsCompletion;
  }, [checkoutData, stepKeys]);

  // Advances the user to the next step in the checkout process.
  const goToNextStep = () => {
    setCheckoutState((prevState) => {
      const nextStep = determineNextStep(prevState.currentStep + 1);
      return {
        ...prevState,
        currentStep: nextStep < stepKeys.length ? nextStep : 0,
      };
    });
  };

  // Initiates the checkout process, starting from the first incomplete step.
  const startCheckout = useCallback(() => {
    setCheckoutState({ currentStep: determineNextStep(0), isActive: true });
  }, []);

  // Ends the checkout process and resets the state.
  const endCheckout = () =>
    setCheckoutState({ currentStep: 0, isActive: false });

  return {
    currentStep: checkoutState.currentStep,
    isActive: checkoutState.isActive,
    goToNextStep,
    startCheckout,
    endCheckout,
    completedSteps: useMemo(() => {
      const stepsCompletion: Partial<CheckoutData> = {};
      for (const step of stepKeys) {
        stepsCompletion[step] = checkoutData[step];
      }
      return stepsCompletion;
    }, [checkoutData]),
  };
}

export default useCheckoutNavigation;
