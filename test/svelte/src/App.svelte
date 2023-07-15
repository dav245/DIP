<script>
  let value = 0;
  $: double = value * 2;

  const increase = () => (value = value + 1);
</script>

<div>Counter: {value}, Double: {double}</div>
<button type="button" on:click={increase}>Increase</button>
