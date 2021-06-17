export default (req, res) => {
    let max=50000
  var sieve = [],
    i,
    j,
    primes = [];
  for (i = 2; i <= max; ++i) {
    if (!sieve[i]) {
      // i has not been marked -- it is prime
      primes.push(i);
      for (j = i << 1; j <= max; j += i) {
        sieve[j] = true;
      }
    }
  }
  res.send({ primelist: primes });
};
