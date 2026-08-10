const askAI = async (question, context = {}) => {
  const normalizedQuestion = question.toLowerCase().trim();

  // ======================================================
  // PARKING
  // ======================================================

  if (
    normalizedQuestion.includes("parking")
  ) {
    if (context.parking === true) {
      return {
        answer: "Yes, parking is available.",
      };
    }

    if (context.parking === false) {
      return {
        answer: "No, parking is not available.",
      };
    }

    return {
      answer: "I don't have parking information for this property.",
    };
  }

  // ======================================================
  // RENT
  // ======================================================

  if (
    normalizedQuestion.includes("rent") ||
    normalizedQuestion.includes("price")
  ) {
    if (context.rent !== undefined) {
      return {
        answer: `The monthly rent is ₹${Number(
          context.rent
        ).toLocaleString("en-IN")}.`,
      };
    }

    return {
      answer: "I don't have the rent information for this property.",
    };
  }

  // ======================================================
  // DEPOSIT
  // ======================================================

  if (
    normalizedQuestion.includes("deposit")
  ) {
    if (context.deposit !== undefined) {
      return {
        answer: `The security deposit is ₹${Number(
          context.deposit
        ).toLocaleString("en-IN")}.`,
      };
    }

    return {
      answer: "I don't have the deposit information for this property.",
    };
  }

  // ======================================================
  // FURNISHING
  // ======================================================

  if (
    normalizedQuestion.includes("furnished") ||
    normalizedQuestion.includes("furnishing")
  ) {
    if (context.furnishing) {
      return {
        answer: `This property is ${context.furnishing}.`,
      };
    }

    return {
      answer: "I don't have the furnishing information for this property.",
    };
  }

  // ======================================================
  // FLOOR
  // ======================================================

  if (
    normalizedQuestion.includes("floor")
  ) {
    if (context.floor) {
      return {
        answer: `This property is on ${context.floor}.`,
      };
    }

    return {
      answer: "I don't have the floor information for this property.",
    };
  }

  // ======================================================
  // PETS
  // ======================================================

  if (
    normalizedQuestion.includes("pet") ||
    normalizedQuestion.includes("pets")
  ) {
    if (context.petsAllowed === true) {
      return {
        answer: "Yes, pets are allowed.",
      };
    }

    if (context.petsAllowed === false) {
      return {
        answer: "No, pets are not allowed.",
      };
    }

    return {
      answer: "I don't have the pet policy for this property.",
    };
  }

  // ======================================================
  // CONFIGURATION
  // ======================================================

  if (
    normalizedQuestion.includes("bhk") ||
    normalizedQuestion.includes("configuration")
  ) {
    if (context.configuration) {
      return {
        answer: `This property is a ${context.configuration}.`,
      };
    }

    return {
      answer: "I don't have the configuration information for this property.",
    };
  }

  // ======================================================
  // AMENITIES
  // ======================================================

  if (
    normalizedQuestion.includes("amenities") ||
    normalizedQuestion.includes("amenity")
  ) {
    if (
      Array.isArray(context.amenities) &&
      context.amenities.length > 0
    ) {
      return {
        answer: `The available amenities are: ${context.amenities.join(
          ", "
        )}.`,
      };
    }

    return {
      answer: "I don't have the amenities information for this property.",
    };
  }

  // ======================================================
  // FALLBACK
  // ======================================================

  return {
    answer:
      "I'm still learning about this property. Please ask me about its rent, deposit, parking, furnishing, floor, pets, configuration, or amenities.",
  };
};

module.exports = {
  askAI,
};