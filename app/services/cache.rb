module Cache
  def from_cache(*args, &block)
    return yield(self) if ENV['DISABLE_CACHE'] == 'true'

    expire = default_expire
    if args.last.is_a?(Hash)
      options = args.pop
      return yield(self) if options[:disabled]
      expire = options.fetch(:expire, expire)
    end
    the_key = key(*args)
    if (value = redis.get(the_key)).nil?
      value = yield(self)
      redis.set(the_key, Marshal.dump(value))
      redis.expire(the_key, expire)
      value
    else
      Marshal.load(value)
    end
  end

  def del_all
    keys = redis.keys("#{self.class.to_s.underscore}:*")
    redis.del(keys) unless keys.empty?
  end

  private

  def key(*args)
    "#{self.class.to_s.underscore}:#{args.join(":")}"
  end

  def redis
    $redis
  end

  def default_expire
    1.week
  end
end
