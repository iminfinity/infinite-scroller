### Installation

_Add to your projects_

```sh
npm i react-infinite-horizontal-scroll
```

```sh
yarn add react-infinite-horizontal-scroll
```

## Usage

_For more examples, please refer to the [examples](https://iminfinity.github.io/infinite-scroller)_

```js
<ScrollerContainer itemWidth={200} itemHeight={200} howManyOnView={3}>
  {new Array(6).fill(0).map((_, index) => (
    <div key={index}>{index}</div>
  ))}
</ScrollerContainer>
```

_Your array of components goes inside `<ScrollerContainer>`_
