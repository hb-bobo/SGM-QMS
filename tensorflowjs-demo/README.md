# tensorflow

> Google开源的深度学习框架

# tensorflow.js

> 运行在浏览器，支持WebGL，利用GPU加速

# 基本概念

* Tensors (张量)
     
  > TensorFlow.js中数据单元是张量：一组数值形成一个或多个维度的数组。一个Tensor实例具有一个shape定义数组形状的属性（即，数组的每个维度中有多少个值）。
  ``` javascript
  tf.tensor
  ```
  ``` javascript
  // 2x3 Tensor
    const shape = [2, 3]; // 2 rows, 3 columns
    const a = tf.tensor([1.0, 2.0, 3.0, 10.0, 20.0, 30.0], shape);
    a.print(); // print Tensor values
    // Output: [[1 , 2 , 3 ],
    //          [10, 20, 30]]

    // The shape can also be inferred:
    const b = tf.tensor([[1.0, 2.0, 3.0], [10.0, 20.0, 30.0]]);
    b.print();
    // Output: [[1 , 2 , 3 ],
    //          [10, 20, 30]]
  ```
  > 然而，构建简单的张量，我们建议您使用以下功能来提高代码的可读性：tf.scalar，tf.tensor1d，tf.tensor2d，tf.tensor3d, tf.tensor4d, tf.tensor5d。
  ``` javascript
    const b = tf.scalar(1)
    b.print();
    // Output: 1
    const c = tf.tensor2d([
        [1.0 , 2.0 , 3.0],
        [10.0, 20.0, 30.0]
    ]);
    c.print();
    // Output: [[1 , 2 , 3 ],
    //          [10, 20, 30]]
  ```
  > TensorFlow.js还提供了创建所有值设置为0（tf.zeros）或将所有值设置为1（tf.ones）的张量的便利函数：

  ``` javascript
    // 3x5 Tensor with all values set to 0
    const zeros = tf.zeros([3, 5]);
    // Output: [[0, 0, 0, 0, 0],
    //          [0, 0, 0, 0, 0],
    //          [0, 0, 0, 0, 0]]
  ```
  
  > 在TensorFlow.js中，张量是不变的; 一旦创建，你就不能改变它们的值。相反，您可以对它们执行操作(Ops)来生成新的张量。

* Variables(变量)

  > Variables是用一个数值张量初始化的。然而，与Tensors 不同，它们的值是可变的。可以使用以下assign方法将新的张量分配给现有的变量：
  
  ``` javascript
    const initialValues = tf.zeros([5]);
    const biases = tf.variable(initialValues); // initialize biases
    biases.print(); // output: [0, 0, 0, 0, 0]

    const updatedValues = tf.tensor1d([0, 1, 0, 1, 0]);
    biases.assign(updatedValues); // update values of biases
    biases.print(); // output: [0, 1, 0, 1, 0]
  ```
  > 变量主要用于在模型训练期间存储和更新值。

* Operations（操作）
  - [TensorFlow.js Operations](https://js.tensorflow.org/api/latest/index.html#Operations-Arithmetic)

  > 虽然张量允许您存储数据，但Ops允许您操作该数据。TensorFlow.js提供了适用于线性代数和机器学习的各种操作，可以在张量上执行。因为张量是不变的，所以这些运算不会改变它们的值; 相反，Ops会返回新的张量。

  > 1.  一元操作，如square：
  ``` javascript
    const x = tf.tensor1d([1, 2, Math.sqrt(2), -1]);
    x.square().print();  // or tf.square(x)
    // [1, 4, 1.9999999, 1]

    const y = tf.tensor1d([1, 2, 4, -1]);
    y.sqrt().print();  // or tf.sqrt(x)
    // [1, 1.4142135, 2, NaN]
  ```
   > 2.  二元操作，如add:
  ``` javascript
    const a = tf.tensor1d([1, 2, 3, 4]);
    const b = tf.tensor1d([10, 20, 30, 40]);

    a.add(b).print();  // or tf.add(a, b)
    // [11, 22, 33, 44]
  ```
  > 3. 支持链式操作：
  ``` javascript
    const e = tf.tensor2d([[1.0, 2.0], [3.0, 4.0]]);
    const f = tf.tensor2d([[5.0, 6.0], [7.0, 8.0]])
    const sq_sum = e.add(f).square();
    sq_sum.print();
    // Output: [[36 , 64 ],
    //          [100, 144]]

    // 所有的操作都暴露在函数的命名空间中，也可以进行下面操作，得到相同的结果
    const sq_sum = tf.square(tf.add(e, f));

  ```

  * Models and Layers (模型和层)
  > 从概念上讲，模型是一个函数，给定一些输入会产生一些期望的输出。
    在TensorFlow.js中有两种创建模型的方法。您可以直接使用op来表示模型所做的工作。例如：

    ``` javascript
    // 这是一个二元方程式求解的表示法。
    function predict(input) {
    // y = a * x ^ 2 + b * x + c
    // tidy再下面会讲
    return tf.tidy(() => {
        const x = tf.scalar(input);

        const ax2 = a.mul(x.square());
        const bx = b.mul(x);
        const y = ax2.add(bx).add(c);

        return y;
    });
    }

    // Define constants: y = 2x^2 + 4x + 8
    const a = tf.scalar(2);
    const b = tf.scalar(4);
    const c = tf.scalar(8);

    // Predict output for input of 2
    const result = predict(2);
    result.print() // Output: 24

    ```
   > 您还可以使用高级API tf.model来构建一个不包含图层的模型，这是深度学习中的流行抽象。以下代码构造了一个tf.sequential模型： 
    ```javascript
    // Define a model for linear regression.
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    model.compile({loss: 'meanSquaredError', optimizer: 'sgd'});

    // Generate some synthetic data for training.
    const xs = tf.tensor2d([1, 2, 3, 4], [4, 1]);
    const ys = tf.tensor2d([1, 3, 5, 7], [4, 1]);

    // Train the model using the data.
    model.fit(xs, ys, {epochs: 10}).then(() => {
    // Use the model to do inference on a data point the model hasn't seen before:
    // Open the browser devtools to see the output
    model.predict(tf.tensor2d([5], [1, 1])).print();
    });
    ```
    > TensorFlow.js中有许多不同类型的图层。举几个例子包括tf.layers.simpleRNN，tf.layers.gru，和tf.layers.lstm。


* 五、内存管理：dispose 和 tf.tidy
  > 由于，tensorFlow.js 使用了 GPU 加速数学运算，在使用张量和变量时，管理 GPU 的内存是必不可少的。
TensorFlow.js 提供了 dispose 和 tf.tidy 两个函数来帮助处理内存：
  > 1. dispose<br>
  你可以调用一个张量或变量来清除和释放它的 GPU 内存。
  ``` javascript
    const x = tf.tensor2d([[0.0, 2.0], [4.0, 6.0]]);
    const x_squared = x.square();

    x.dispose();
    x_squared.dispose();
  ``` 
  > 2. tf.tidy
        > dispose进行大量张量操作时使用可能很麻烦。TensorFlow.js提供了另一个功能tf.tidy，它类似于JavaScript中的作用域，但对于GPU支持的张量有效。
        tf.tidy执行一个函数并清除所有创建的中间张量，释放它们的GPU内存。它不清除内部函数的返回值。

    ``` javascript
    // tf.tidy takes a function to tidy up after
    const average = tf.tidy(() => {

      // tf.tidy 会清除在这个函数内的张量使用的所有GPU内存，而不是返回的张量。
      // 即使在像下面这样的一个简短的操作序列中，也会创建一些中间的张量。所以，把 ops 放在 tidy 函数中是一个好的选择

      const y = tf.tensor1d([1.0, 2.0, 3.0, 4.0]);
      const z = tf.ones([4]);
      // 不能return 异步
      return y.sub(z).square().mean();
    });

    average.print() // Output: 3.5

        ``` 