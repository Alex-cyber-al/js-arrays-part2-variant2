const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Функція для введення даних з консолі
function ask(question) {
  return new Promise((resolve) => rl.question(question, resolve));
}

// Генерація відсортованого масиву
function generateSortedArray(size) {
  const array = [];

  for (let i = 0; i < size; i++) {
    array.push(i + 1);
  }

  return array;
}

// Лінійний пошук
function linearSearch(array, target) {
  let comparisons = 0;

  for (let i = 0; i < array.length; i++) {
    comparisons++;

    if (array[i] === target) {
      return {
        index: i,
        comparisons,
      };
    }
  }

  return {
    index: -1,
    comparisons,
  };
}

// Бінарний пошук, ітеративний варіант
function binarySearchIterative(array, target) {
  let left = 0;
  let right = array.length - 1;
  let comparisons = 0;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    comparisons++;

    if (array[middle] === target) {
      return {
        index: middle,
        comparisons,
      };
    }

    if (array[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return {
    index: -1,
    comparisons,
  };
}

// Бінарний пошук, рекурсивний варіант
function binarySearchRecursive(array, target, left = 0, right = array.length - 1, comparisons = 0) {
  if (left > right) {
    return {
      index: -1,
      comparisons,
    };
  }

  const middle = Math.floor((left + right) / 2);
  comparisons++;

  if (array[middle] === target) {
    return {
      index: middle,
      comparisons,
    };
  }

  if (array[middle] < target) {
    return binarySearchRecursive(array, target, middle + 1, right, comparisons);
  }

  return binarySearchRecursive(array, target, left, middle - 1, comparisons);
}

// Jump Search
function jumpSearch(array, target) {
  const length = array.length;
  let step = Math.floor(Math.sqrt(length));
  let previous = 0;
  let comparisons = 0;

  while (previous < length && array[Math.min(step, length) - 1] < target) {
    comparisons++;
    previous = step;
    step += Math.floor(Math.sqrt(length));

    if (previous >= length) {
      return {
        index: -1,
        comparisons,
      };
    }
  }

  for (let i = previous; i < Math.min(step, length); i++) {
    comparisons++;

    if (array[i] === target) {
      return {
        index: i,
        comparisons,
      };
    }
  }

  return {
    index: -1,
    comparisons,
  };
}

// Interpolation Search
function interpolationSearch(array, target) {
  let low = 0;
  let high = array.length - 1;
  let comparisons = 0;

  while (
    low <= high &&
    target >= array[low] &&
    target <= array[high]
  ) {
    comparisons++;

    if (array[low] === array[high]) {
      if (array[low] === target) {
        return {
          index: low,
          comparisons,
        };
      }

      return {
        index: -1,
        comparisons,
      };
    }

    const position =
      low +
      Math.floor(
        ((target - array[low]) * (high - low)) /
          (array[high] - array[low])
      );

    if (array[position] === target) {
      return {
        index: position,
        comparisons,
      };
    }

    if (array[position] < target) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }

  return {
    index: -1,
    comparisons,
  };
}

// Exponential Search
function exponentialSearch(array, target) {
  let comparisons = 0;

  if (array.length === 0) {
    return {
      index: -1,
      comparisons,
    };
  }

  comparisons++;

  if (array[0] === target) {
    return {
      index: 0,
      comparisons,
    };
  }

  let i = 1;

  while (i < array.length && array[i] <= target) {
    comparisons++;
    i *= 2;
  }

  const result = binarySearchIterative(
    array.slice(Math.floor(i / 2), Math.min(i, array.length)),
    target
  );

  if (result.index === -1) {
    return {
      index: -1,
      comparisons: comparisons + result.comparisons,
    };
  }

  return {
    index: Math.floor(i / 2) + result.index,
    comparisons: comparisons + result.comparisons,
  };
}

// Пошук першого входження
function findFirstOccurrence(array, target) {
  let left = 0;
  let right = array.length - 1;
  let result = -1;
  let comparisons = 0;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    comparisons++;

    if (array[middle] === target) {
      result = middle;
      right = middle - 1;
    } else if (array[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return {
    index: result,
    comparisons,
  };
}

// Пошук останнього входження
function findLastOccurrence(array, target) {
  let left = 0;
  let right = array.length - 1;
  let result = -1;
  let comparisons = 0;

  while (left <= right) {
    const middle = Math.floor((left + right) / 2);
    comparisons++;

    if (array[middle] === target) {
      result = middle;
      left = middle + 1;
    } else if (array[middle] < target) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  return {
    index: result,
    comparisons,
  };
}

// Пошук діапазону значень
function searchRange(array, minValue, maxValue) {
  const result = [];
  let comparisons = 0;

  for (let i = 0; i < array.length; i++) {
    comparisons++;

    if (array[i] >= minValue && array[i] <= maxValue) {
      result.push(array[i]);
    }
  }

  return {
    values: result,
    comparisons,
  };
}

// Вимірювання часу роботи алгоритму
function measureTime(searchFunction, array, target) {
  const start = performance.now();
  const result = searchFunction(array, target);
  const end = performance.now();

  return {
    ...result,
    time: (end - start).toFixed(5),
  };
}

// Демонстрація роботи всіх алгоритмів
function runAllSearchAlgorithms() {
  const array = generateSortedArray(100);
  const target = 75;

  console.log("\nМасив: від 1 до 100");
  console.log("Шукане число:", target);

  const results = [
    {
      algorithm: "Linear Search",
      ...measureTime(linearSearch, array, target),
    },
    {
      algorithm: "Binary Search Iterative",
      ...measureTime(binarySearchIterative, array, target),
    },
    {
      algorithm: "Binary Search Recursive",
      ...measureTime(binarySearchRecursive, array, target),
    },
    {
      algorithm: "Jump Search",
      ...measureTime(jumpSearch, array, target),
    },
    {
      algorithm: "Interpolation Search",
      ...measureTime(interpolationSearch, array, target),
    },
    {
      algorithm: "Exponential Search",
      ...measureTime(exponentialSearch, array, target),
    },
  ];

  console.table(results);
}

// Тест пошуку першого та останнього входження
function testOccurrences() {
  const array = [1, 2, 2, 2, 3, 4, 5, 5, 5, 6];
  const target = 5;

  console.log("\nМасив з повтореннями:");
  console.log(array);
  console.log("Шукане число:", target);

  console.log("Перше входження:");
  console.table([findFirstOccurrence(array, target)]);

  console.log("Останнє входження:");
  console.table([findLastOccurrence(array, target)]);
}

// Тест пошуку діапазону
function testRangeSearch() {
  const array = generateSortedArray(50);
  const minValue = 15;
  const maxValue = 25;

  const result = searchRange(array, minValue, maxValue);

  console.log("\nПошук діапазону значень");
  console.log(`Діапазон: від ${minValue} до ${maxValue}`);
  console.log("Знайдені значення:");
  console.log(result.values);
  console.log("Кількість порівнянь:", result.comparisons);
}

// Benchmark для різних розмірів масиву
function benchmark() {
  const sizes = [100, 1000, 5000];
  const table = [];

  for (const size of sizes) {
    const array = generateSortedArray(size);
    const target = size;

    table.push({
      size,
      algorithm: "Linear Search",
      ...measureTime(linearSearch, array, target),
    });

    table.push({
      size,
      algorithm: "Binary Search Iterative",
      ...measureTime(binarySearchIterative, array, target),
    });

    table.push({
      size,
      algorithm: "Jump Search",
      ...measureTime(jumpSearch, array, target),
    });

    table.push({
      size,
      algorithm: "Interpolation Search",
      ...measureTime(interpolationSearch, array, target),
    });

    table.push({
      size,
      algorithm: "Exponential Search",
      ...measureTime(exponentialSearch, array, target),
    });
  }

  console.log("\nПорівняння швидкості на масивах різного розміру:");
  console.table(table);
}

// Текстовий графік залежності часу від розміру масиву
function showTextChart() {
  const sizes = [100, 1000, 5000];
  const targetPosition = "останній елемент";

  console.log("\nГрафік залежності часу від розміру масиву");
  console.log(`Пошук: ${targetPosition}`);
  console.log("Кожна зірочка приблизно показує збільшення часу.\n");

  for (const size of sizes) {
    const array = generateSortedArray(size);
    const target = size;

    const linear = measureTime(linearSearch, array, target);
    const binary = measureTime(binarySearchIterative, array, target);

    const linearStars = "*".repeat(Math.max(1, Math.round(linear.time * 100)));
    const binaryStars = "*".repeat(Math.max(1, Math.round(binary.time * 100)));

    console.log(`Розмір масиву: ${size}`);
    console.log(`Linear Search: ${linearStars} ${linear.time} ms`);
    console.log(`Binary Search: ${binaryStars} ${binary.time} ms`);
    console.log("--------------------------------");
  }
}

// Меню програми
function showMenu() {
  console.log("\n===== Алгоритми пошуку в масивах =====");
  console.log("1. Показати роботу всіх алгоритмів пошуку");
  console.log("2. Пошук першого та останнього входження");
  console.log("3. Пошук діапазону значень");
  console.log("4. Benchmark швидкості");
  console.log("5. Текстовий графік часу");
  console.log("0. Вийти");
}

async function main() {
  let isRunning = true;

  while (isRunning) {
    showMenu();

    const choice = await ask("Оберіть дію: ");

    switch (choice) {
      case "1":
        runAllSearchAlgorithms();
        break;
      case "2":
        testOccurrences();
        break;
      case "3":
        testRangeSearch();
        break;
      case "4":
        benchmark();
        break;
      case "5":
        showTextChart();
        break;
      case "0":
        console.log("Роботу програми завершено.");
        isRunning = false;
        rl.close();
        break;
      default:
        console.log("Невірний вибір. Спробуйте ще раз.");
    }
  }
}

main();