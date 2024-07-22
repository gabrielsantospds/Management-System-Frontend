<script>
</script>

<template>
  <main class="container">
    <div class="bg-body-tertiary p-5 rounded">
      <h1>
        Management system
      </h1>

      <p class="lead">
        This example is a quick exercise to illustrate how the top-aligned navbar works. As you scroll, this navbar remains in its original position and moves with the rest of the page.
      </p>

      <form action="">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Full Name</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="">
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
        </div>
        <div class="row">
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">Full Name</label>
            <input type="text" class="form-control" placeholder="First name" aria-label="First name">
          </div>
          <div class="col">
            <label for="exampleFormControlInput1" class="form-label">Full Name</label>
            <input type="text" class="form-control" placeholder="Last name" aria-label="Last name">
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </main>
</template>

<style>

.rounded {
  padding: 48px 120px 48px 120px !important;
}

h1 {
  color: #333379;
  text-align: center;
}

.btn {
  margin-top: 20px;
}

</style>